import csv
import datetime
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from tqdm import tqdm
from core.models import Asset, AssetPerformanceData

class Command(BaseCommand):
    help = 'Import data from a CSV file into the AssetPerformanceData table'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The CSV file to import')

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']
        self.stdout.write(self.style.SUCCESS(f'Importing data from {csv_file_path}'))

        with open(csv_file_path, mode='r') as file:
            reader = csv.DictReader(file)
            for row in tqdm(reader, desc="Importing", unit="row"):
                # Find or create the Asset instance
                asset, created = Asset.objects.get_or_create(
                    symbol=row['Ticker'],
                    defaults={'name': row['Ticker']}  # Default values if a new asset is created
                )

                # Convert date from string to datetime.date object
                date_obj = datetime.datetime.strptime(row['Date'], '%m/%d/%Y').date()

                # Convert volume to an integer, handling potential float values
                volume = int(float(row['Volume']))

                # Create the AssetPerformanceData instance
                try:
                    AssetPerformanceData.objects.create(
                        asset=asset,
                        date=date_obj,
                        low=row['Low'],
                        opening_price=row['Open'],
                        volume=volume,
                        high=row['High'],
                        closing_price=row['Close'],
                        adjusted_close=row['Adjusted Close'],
                        is_fake=False  # Or determine based on your logic
                    )
                except IntegrityError as e:
                    self.stdout.write(self.style.WARNING(f'Skipped duplicate entry for {asset.symbol} on {date_obj}'))

        self.stdout.write(self.style.SUCCESS('Data import completed successfully'))
