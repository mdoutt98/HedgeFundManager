from django.core.management.base import BaseCommand
import csv
import random
from datetime import timedelta, date
from tqdm import tqdm
from core.models import Asset, AssetPerformanceData
from decimal import Decimal

class Command(BaseCommand):
    help = 'Generates fake stock prices for all assets.'

    def handle(self, *args, **kwargs):
        generate_stock_prices()
        self.stdout.write(self.style.SUCCESS('Successfully generated stock prices for today'))

def generate_stock_prices():
    """
    Generates fake stock prices for all assets from the most recent entry to today, excluding weekends.
    Logs assets with missing data to 'MissingData.csv'.
    """
    all_assets = Asset.objects.all()
    missing_data_assets = []

    for asset in tqdm(all_assets, desc="Processing assets"):
        last_performance_data = AssetPerformanceData.objects.filter(asset=asset).order_by('-date').first()
        if not last_performance_data:
            missing_data_assets.append(asset.symbol)
            continue

        start_date = last_performance_data.date + timedelta(days=1)
        end_date = date.today()
        delta = end_date - start_date
        for single_date in (start_date + timedelta(days=i) for i in range(delta.days + 1)):
            if single_date.weekday() < 5:  # 0-4 corresponds to Monday-Friday
                generate_price_for_asset(asset, single_date)

    with open('MissingData.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Asset Symbol'])
        for symbol in missing_data_assets:
            writer.writerow([symbol])

def generate_price_for_asset(asset, single_date):
    """
    Generates a fake stock price for a given asset and date, ensuring prices are not negative.
    """
    last_performance_data = AssetPerformanceData.objects.filter(asset=asset, date__lt=single_date).order_by('-date').first()

    if last_performance_data:
        min_step = -min(last_performance_data.closing_price, 1)  # Prevents the price from going below 0
        max_step = 1
        random_step = Decimal(str(random.uniform(float(min_step), float(max_step)))).quantize(Decimal('0.01'))
        new_price = max(last_performance_data.closing_price + random_step, Decimal('0.01'))  # Ensures price is not negative
    else:
        new_price = Decimal(random.uniform(10, 100)).quantize(Decimal('0.01'))

    low = new_price - Decimal(random.uniform(0, 1)).quantize(Decimal('0.01'))
    high = new_price + Decimal(random.uniform(0, 1)).quantize(Decimal('0.01'))

    performance_data, created = AssetPerformanceData.objects.get_or_create(
        asset=asset,
        date=single_date,
        defaults={
            'opening_price': new_price,
            'closing_price': new_price,
            'low': max(low, Decimal('0.01')),  # Ensure low is not negative
            'high': high,
            'volume': random.randint(1000, 10000),
            'adjusted_close': new_price,
            'is_fake': True
        }
    )

    if not created:
        performance_data.opening_price = new_price
        performance_data.closing_price = new_price
        performance_data.low = max(low, Decimal('0.01'))  # Ensure low is not negative
        performance_data.high = high
        performance_data.volume = random.randint(1000, 10000)
        performance_data.adjusted_close = new_price
        performance_data.is_fake = True
        performance_data.save()
