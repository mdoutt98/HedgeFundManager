from django.core.management.base import BaseCommand
from core.models import Asset, AssetPerformanceData

class Command(BaseCommand):
    help = 'Displays the number of stocks and AssetPerformanceData entries in the database.'

    def handle(self, *args, **kwargs):
        # Count the number of Asset entries
        asset_count = Asset.objects.count()

        # Count the number of AssetPerformanceData entries
        asset_performance_data_count = AssetPerformanceData.objects.count()

        # Print the counts
        self.stdout.write(self.style.SUCCESS(f'Total number of stocks: {asset_count}'))
        self.stdout.write(self.style.SUCCESS(f'Total number of AssetPerformanceData entries: {asset_performance_data_count}'))
