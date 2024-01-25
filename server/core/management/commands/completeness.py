from django.core.management.base import BaseCommand
import datetime
from core.models import Asset, AssetPerformanceData
from tqdm import tqdm
from django.db.models import Q

class Command(BaseCommand):
    help = 'Check completeness of stock data in the database.'

    def handle(self, *args, **kwargs):
        self.check_stock_data_completeness()

    def check_stock_data_completeness(self):
        start_date = datetime.date.today() - datetime.timedelta(days=365 * 10)
        end_date = datetime.date.today()

        missing_data = {}
        all_assets = Asset.objects.all()

        for asset in tqdm(all_assets, desc="Checking assets"):
            # Find all dates with data
            existing_dates = AssetPerformanceData.objects.filter(
                asset=asset,
                date__range=[start_date, end_date]
            ).values_list('date', flat=True)

            # Check which dates are missing
            missing_dates = [date for date in self.daterange(start_date, end_date) if date not in existing_dates]
            if missing_dates:
                missing_data[asset.symbol] = missing_dates

        for symbol, dates in missing_data.items():
            self.stdout.write(self.style.WARNING(
                f"Ticker {symbol} is missing data for {len(dates)} days. Missing from {dates[0]} to {dates[-1]}."
            ))

        self.stdout.write(self.style.SUCCESS(f"Total number of stock tickers with missing data: {len(missing_data)}"))

    def daterange(self, start_date, end_date):
        for n in range(int((end_date - start_date).days)):
            current_date = start_date + datetime.timedelta(n)
            if self.is_trading_day(current_date):
                yield current_date

    def is_trading_day(self, date):
        # Common U.S. stock market holidays
        holidays = self.get_us_stock_market_holidays(date.year)

        # Check if the date is a weekend
        if date.weekday() >= 5:  # 5 and 6 are Saturday and Sunday
            return False

        # Check if the date is a holiday
        if date in holidays:
            return False

        return True

    def get_us_stock_market_holidays(self, year):
        # New Year's Day
        new_years_day = datetime.date(year, 1, 1)
        # Martin Luther King Jr. Day (third Monday in January)
        mlk_day = datetime.date(year, 1, 1) + datetime.timedelta(days=14 - datetime.date(year, 1, 1).weekday() + 7)
        # Washington's Birthday (third Monday in February)
        presidents_day = datetime.date(year, 2, 1) + datetime.timedelta(
            days=14 - datetime.date(year, 2, 1).weekday() + 7)
        # Good Friday (date varies)
        good_friday = self.calculate_good_friday(year)
        # Memorial Day (last Monday in May)
        memorial_day = datetime.date(year, 5, 31) - datetime.timedelta(days=datetime.date(year, 5, 31).weekday())
        # Independence Day
        independence_day = datetime.date(year, 7, 4)
        # Labor Day (first Monday in September)
        labor_day = datetime.date(year, 9, 1) + datetime.timedelta(days=7 - datetime.date(year, 9, 1).weekday())
        # Thanksgiving Day (fourth Thursday in November)
        thanksgiving = datetime.date(year, 11, 1) + datetime.timedelta(
            days=21 + 3 - datetime.date(year, 11, 1).weekday())
        # Christmas Day
        christmas = datetime.date(year, 12, 25)

        # Adjust for weekends
        new_years_day = self.adjust_for_weekend_holiday(new_years_day)
        independence_day = self.adjust_for_weekend_holiday(independence_day)
        christmas = self.adjust_for_weekend_holiday(christmas)

        return {
            new_years_day,
            mlk_day,
            presidents_day,
            good_friday,
            memorial_day,
            independence_day,
            labor_day,
            thanksgiving,
            christmas
        }

    def adjust_for_weekend_holiday(self, holiday):
        if holiday.weekday() == 5:  # Saturday
            return holiday - datetime.timedelta(days=1)
        elif holiday.weekday() == 6:  # Sunday
            return holiday + datetime.timedelta(days=1)
        return holiday

    def calculate_good_friday(self, year):
        # Calculate Easter Sunday (a complex calculation)
        a = year % 19
        b = year // 100
        c = year % 100
        d = b // 4
        e = b % 4
        f = (b + 8) // 25
        g = (b - f + 1) // 3
        h = (19 * a + b - d - g + 15) % 30
        i = c // 4
        k = c % 4
        l = (32 + 2 * e + 2 * i - h - k) % 7
        m = (a + 11 * h + 22 * l) // 451
        month = (h + l - 7 * m + 114) // 31
        day = ((h + l - 7 * m + 114) % 31) + 1
        easter_sunday = datetime.date(year, month, day)

        # Good Friday is two days before Easter Sunday
        return easter_sunday - datetime.timedelta(days=2)