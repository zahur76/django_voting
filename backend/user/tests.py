from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase


class RegistrationTestCase(APITestCase):
    def test_registration(self):
        data = {
            "username": "testuser",
            "email": "testemail@example.com",
            "password": "testpassword",
        }
        response = self.client.post(reverse("register_user"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginLogoutTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
        )
        self.token = Token.objects.create(user=self.user)

    def test_login(self):
        data = {
            "username": "testuser",
            "password": "testpassword",
        }
        response = self.client.post(reverse("login"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
