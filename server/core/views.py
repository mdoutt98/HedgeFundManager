from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from .models import League, Asset, AssetPerformanceData, Transaction, Holding, UserProfile
from .serializers import LeagueSerializer, AssetSerializer, AssetPerformanceDataSerializer, TransactionSerializer, UserSerializer
from django.db.models import Sum, F
from django.db import transaction as db_transaction
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

    def perform_create(self, serializer):
        # Set the league creator to the current user
        serializer.save(creator=self.request.user)

    def perform_destroy(self, instance):
        # Custom logic before deleting a league
        if self.request.user != instance.creator:
            raise PermissionDenied("You do not have permission to delete this league.")
        super().perform_destroy(instance)

class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

class AssetPerformanceDataViewSet(viewsets.ModelViewSet):
    queryset = AssetPerformanceData.objects.all()
    serializer_class = AssetPerformanceDataSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

class TransactionCreateView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        transaction = serializer.save(user=self.request.user)

        with db_transaction.atomic():
            # Retrieve or initialize the user's profile
            profile, _ = UserProfile.objects.get_or_create(user=self.request.user)

            if transaction.transaction_type == 'BUY':
                # Calculate the cost and update the user's balance
                cost = transaction.quantity * transaction.price
                profile.balance -= cost
                profile.save()

                # Update or create holding
                holding, created = Holding.objects.get_or_create(
                    portfolio=transaction.user.portfolio,
                    asset=transaction.asset,
                    defaults={'quantity': 0, 'average_purchase_price': 0, 'total_investment': 0}
                )
                if created:
                    holding.quantity = transaction.quantity
                    holding.average_purchase_price = transaction.price
                    holding.total_investment = cost
                else:
                    total_quantity = holding.quantity + transaction.quantity
                    holding.total_investment += cost
                    holding.average_purchase_price = holding.total_investment / total_quantity
                    holding.quantity = total_quantity
                holding.save()

            elif transaction.transaction_type == 'SELL':
                # Calculate earnings and update the user's balance
                earnings = transaction.quantity * transaction.price
                profile.balance += earnings
                profile.save()

                # Update holding
                holding = Holding.objects.get(
                    portfolio=transaction.user.portfolio,
                    asset=transaction.asset
                )
                holding.quantity -= transaction.quantity
                if holding.quantity == 0:
                    holding.delete()
                else:
                    total_investment_remaining = holding.average_purchase_price * holding.quantity
                    holding.total_investment = total_investment_remaining
                    holding.save()

            # Update Portfolio total value
            transaction.user.portfolio.total_value = Holding.objects.filter(
                portfolio=transaction.user.portfolio
            ).aggregate(
                total_value=Sum(F('quantity') * F('average_purchase_price'))
            )['total_value'] or 0
            transaction.user.portfolio.save()
class LeagueCreateView(generics.CreateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [IsAuthenticated]


class LeagueJoinView(generics.UpdateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        league = self.get_object()
        league.members.add(self.request.user)
        serializer.save()

class LeagueDetailView(generics.RetrieveAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

class UserDetailUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Optionally, restrict to get the user object of the currently logged-in user
        return self.request.user


class PasswordResetView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        new_password = request.data.get("new_password")

        if not new_password:
            return Response({"error": "New password is required."}, status=status.HTTP_400_BAD_REQUEST)

        user.password = make_password(new_password)
        user.save()
        return Response({"message": "Password successfully updated."}, status=status.HTTP_200_OK)

User = get_user_model()
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        login_field = request.data.get('username')  # Using .get() for safe access
        password = request.data.get('password')

        if login_field and password:
            if '@' in login_field:
                # Handle email login
                user = User.objects.filter(email=login_field).first()
                if user:
                    username = user.username
                    user = authenticate(request, username=username, password=password)
            else:
                # Handle username login
                user = authenticate(request, username=login_field, password=password)

            if user is not None:
                login(request, user)
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid username/email or password'}, status=status.HTTP_401_UNAUTHORIZED)