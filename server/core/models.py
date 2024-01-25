from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models import Sum


class League(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leagues_created')
    members = models.ManyToManyField(User, related_name='leagues_joined')
    creation_date = models.DateField(auto_now_add=True)
    initial_capital = models.DecimalField(max_digits=10, decimal_places=2)
    max_users = models.IntegerField()
    asset_limitations = models.JSONField()  # Storing as JSON for flexibility
    start_date = models.DateField()
    end_date = models.DateField()
    mode = models.CharField(
        max_length=20,
        choices=[('Real', 'Real'), ('Simulated-MC', 'Simulated-Monte Carlo'), ('Simulated-Hybrid', 'Simulated-Hybrid')]
    )


class Asset(models.Model):
    EQUITY = 'EQ'
    BOND = 'BD'
    DERIVATIVE = 'DV'
    MUTUAL_FUND = 'MF'
    ETF = 'ETF'
    CURRENCY = 'CR'
    COMMODITY = 'CM'
    CRYPTO = 'CP'

    ASSET_TYPES = [
        (EQUITY, 'Equity'),
        (BOND, 'Bond'),
        (DERIVATIVE, 'Derivative'),
        (MUTUAL_FUND, 'Mutual Fund'),
        (ETF, 'ETF'),
        (CURRENCY, 'Currency'),
        (COMMODITY, 'Commodity'),
        (CRYPTO, 'Crypto'),
    ]

    name = models.CharField(max_length=100)
    asset_type = models.CharField(max_length=3, choices=ASSET_TYPES)
    symbol = models.CharField(max_length=10)

class AssetPerformanceData(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    date = models.DateField()
    opening_price = models.DecimalField(max_digits=10, decimal_places=2)
    closing_price = models.DecimalField(max_digits=10, decimal_places=2)
    high = models.DecimalField(max_digits=10, decimal_places=2)
    low = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.BigIntegerField()
    adjusted_close = models.DecimalField(max_digits=10, decimal_places=2)  # Added field
    is_fake = models.BooleanField(default=False)  # Indicates if the data is fake or real

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date_time = models.DateTimeField(auto_now_add=True)
    TRANSACTION_TYPE_CHOICES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell')
    ]
    transaction_type = models.CharField(max_length=4, choices=TRANSACTION_TYPE_CHOICES)

    def clean(self):
        if self.transaction_type == 'BUY':
            cost = self.quantity * self.price
            user_balance = self.user.get_balance()  # Assuming you have a method to get the user's balance
            if cost > user_balance:
                raise ValidationError('Insufficient funds to complete this purchase.')

        if self.transaction_type == 'SELL':
            # Assuming you have a method to get the total quantity of an asset in holdings
            total_holding = self.user.portfolio.holdings.filter(asset=self.asset).aggregate(Sum('quantity'))[
                                'quantity__sum'] or 0
            if self.quantity > total_holding:
                raise ValidationError('Cannot sell more assets than currently held.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)



class Portfolio(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='portfolio')
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='portfolios')
    total_value = models.DecimalField(max_digits=15, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
class Holding(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='holdings')
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    average_purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_investment = models.DecimalField(max_digits=15, decimal_places=2)
    first_purchase_date = models.DateField()
    unrealized_gain_loss = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    realized_gain_loss = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    last_transaction_date = models.DateField(null=True, blank=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def get_balance(self):
        # Return the balance from the user profile
        return self.balance

# Placeholder for 'Simulated-MC' and 'Simulated-Hybrid' simulation algorithms
def simulate_stock_prices_mc():
    # Monte Carlo simulation algorithm implementation...
    pass

def simulate_stock_prices_hybrid():
    # Mean reversion and econometric input-based simulation algorithm implementation...
    pass
