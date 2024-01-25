from django.contrib import admin
from .models import League, Asset, AssetPerformanceData, Transaction, Portfolio, Holding, UserProfile

@admin.register(League)
class LeagueAdmin(admin.ModelAdmin):
    list_display = ['name', 'creator', 'initial_capital', 'max_users', 'start_date', 'end_date', 'mode']
    search_fields = ['name', 'creator__username']

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ['name', 'asset_type', 'symbol']
    search_fields = ['name', 'symbol']

@admin.register(AssetPerformanceData)
class AssetPerformanceDataAdmin(admin.ModelAdmin):
    list_display = ['asset', 'date', 'opening_price', 'closing_price', 'high', 'low', 'volume', 'adjusted_close', 'is_fake']
    search_fields = ['asset__name', 'date']

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'asset', 'quantity', 'price', 'date_time', 'transaction_type']
    search_fields = ['user__username', 'asset__name']

@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ['user', 'league', 'total_value', 'created_at', 'updated_at']
    search_fields = ['user__username', 'league__name']

@admin.register(Holding)
class HoldingAdmin(admin.ModelAdmin):
    list_display = ['portfolio', 'asset', 'quantity', 'average_purchase_price', 'total_investment', 'first_purchase_date', 'unrealized_gain_loss', 'realized_gain_loss', 'last_transaction_date']
    search_fields = ['portfolio__user__username', 'asset__name']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'balance']
    search_fields = ['user__username']
