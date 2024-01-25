from django.urls import reverse
from rest_framework import status
from django.test import TransactionTestCase
from django.contrib.auth.models import User
from core.models import League, Asset
from rest_framework.test import APIClient

class UserRegistrationTestCase(TransactionTestCase):

    def test_user_registration(self):
        data = {"username": "testuser", "password": "strong_password123"}
        client = APIClient()
        response = client.post(reverse('register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LeagueTestCase(TransactionTestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_league(self):
        data = {
            "name": "New League",
            "initial_capital": 10000.00,
            "max_users": 10,
            "asset_limitations": {"type": "none"},
            "start_date": "2023-01-01",
            "end_date": "2023-12-31"
        }
        response = self.client.post(reverse('league-create'), data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print(response.data)  # Debugging information
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_join_league(self):
        league = League.objects.create(
            name="Test League",
            creator=self.user,
            initial_capital=10000.00,
            max_users=10,
            asset_limitations={"type": "none"},
            start_date="2023-01-01",
            end_date="2023-12-31"
        )
        response = self.client.post(reverse('league-join', args=[league.id]), {})
        if response.status_code != status.HTTP_200_OK:
            print(response.data)  # Debugging information
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TransactionTestCase(TransactionTestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.asset = Asset.objects.create(name="Test Asset", asset_type="EQ", symbol="TST")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_create_transaction(self):
        data = {
            "asset": self.asset.id,
            "quantity": 5,
            "price_at_transaction": 100.00
        }
        response = self.client.post(reverse('transaction-create'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
