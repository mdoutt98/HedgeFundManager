from rest_framework import serializers
from .models import League, Asset, AssetPerformanceData, Transaction, User
from django.db.models import Sum

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'
        read_only_fields = ('members', 'creator')

    def create(self, validated_data):
        # Set the league creator to the current user from the request context
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = '__all__'

class AssetPerformanceDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetPerformanceData
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

    def validate(self, data):
        if data['transaction_type'] == 'BUY':
            cost = data['quantity'] * data['price']
            user_balance = data['user'].get_balance()  # Assuming you have a method to get the user's balance
            if cost > user_balance:
                raise serializers.ValidationError('Insufficient funds to complete this purchase.')
        if data['transaction_type'] == 'SELL':
            total_holding = data['user'].portfolio.holdings.filter(asset=data['asset']).aggregate(Sum('quantity'))[
                                'quantity__sum'] or 0
            if data['quantity'] > total_holding:
                raise serializers.ValidationError('Cannot sell more assets than currently held.')
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)

        # Handling password update
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        instance.save()
        return instance

