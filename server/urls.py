from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import (
    LeagueViewSet, AssetViewSet, AssetPerformanceDataViewSet, TransactionViewSet,
    CreateUserView, TransactionCreateView, LeagueCreateView, LeagueJoinView, LeagueDetailView, UserDetailUpdateView, PasswordResetView, LoginView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'leagues', LeagueViewSet)
router.register(r'assets', AssetViewSet)
router.register(r'asset-performance-data', AssetPerformanceDataViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', CreateUserView.as_view(), name='register'),
    path('api/transactions/create/', TransactionCreateView.as_view(), name='transaction-create'),
    path('api/leagues/create/', LeagueCreateView.as_view(), name='league-create'),
    path('api/leagues/join/<int:pk>/', LeagueJoinView.as_view(), name='league-join'),
    path('api/leagues/<int:pk>/', LeagueDetailView.as_view(), name='league-detail'),
    path('api/users/<int:pk>/', UserDetailUpdateView.as_view(), name='user-update'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('api/login/', LoginView.as_view(), name='login'),
]     

print(urlpatterns)  # This line is for debugging purposes only
