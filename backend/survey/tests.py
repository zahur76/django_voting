from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from survey import models
import json


class SurveyPrivateTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword",
        )

        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token}")

        self.survey = models.Survey.objects.create(
            user=self.user,
            title="testsurvey",
            description="testsurvey",
            voters=3,
        )

        self.option_1 = models.Option.objects.create(
            survey=self.survey,
            option="Option 1",
        )

        self.option_2 = models.Option.objects.create(
            survey=self.survey,
            option="Option 2",
        )

        self.code = models.Code.objects.create(
            survey=self.survey,
            code="AAAA",
        )

    def test_create_poll_for_signed_in_user(self):

        data = {
            "title": "test 2",
            "description": "test 2 description",
            "voters": 3,
        }
        response = self.client.post(reverse("create_survey"), data, format="json")
        self.assertTrue(len(models.Code.objects.all()), 7)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_results_for_signed_in_user(self):
        response = self.client.get(f"/api/survey/list_survey/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_results_for_signed_in_user(self):
        response = self.client.get(f"/api/survey/list_survey/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_contains_voting_results(self):
        response = self.client.get(f"/api/survey/list_survey/")
        data = json.loads(response.content.decode("utf-8"))[0]["options"]
        self.assertTrue("votes" in data[0].keys())


class SurveyPublicTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpassword",
        )

        self.survey = models.Survey.objects.create(
            user=self.user,
            title="testsurvey",
            description="testsurvey",
            voters=3,
        )

        self.option_1 = models.Option.objects.create(
            survey=self.survey,
            option="Option 1",
        )

        self.option_2 = models.Option.objects.create(
            survey=self.survey,
            option="Option 2",
        )

        self.code = models.Code.objects.create(
            survey=self.survey,
            code="AAAA",
        )

    def test_voting_anonymous(self):

        data = {"vote": self.option_1.id, "code": self.code.code}
        response = self.client.post(
            reverse("vote", args=(self.survey.id,)), data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Option.objects.get(id=self.option_1.id).votes, 1)
        print(len(models.Code.objects.all()))
        self.assertEqual(len(models.Code.objects.all()), 0)

    def test_anonymous_list_no_voting_results(self):
        response = self.client.get(f"/api/survey/list_survey/?id={self.survey.id}")
        data = json.loads(response.content.decode("utf-8"))[0]["options"]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse("votes" in data[0].keys())
