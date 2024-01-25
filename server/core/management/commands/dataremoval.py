from django.core.management.base import BaseCommand
from core.models import AssetPerformanceData
from tqdm import tqdm

class Command(BaseCommand):
    help = 'Removes all fake stock data from the database.'

    def handle(self, *args, **kwargs):
        self.remove_fake_data()
        self.stdout.write(self.style.SUCCESS('Successfully removed all fake stock data'))

    def remove_fake_data(self):
        """
        Removes all stock data where is_fake is True.
        """
        fake_data_query = AssetPerformanceData.objects.filter(is_fake=True)
        count = fake_data_query.count()

        if count > 0:
            self.stdout.write(f'Found {count} fake data entries. Removing...')
            for asset_data in tqdm(fake_data_query, desc="Removing fake data"):
                asset_data.delete()
            self.stdout.write(self.style.SUCCESS(f'Removed {count} fake data entries.'))
        else:
            self.stdout.write(self.style.SUCCESS('No fake data found to remove.'))
