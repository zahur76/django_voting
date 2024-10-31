"""
Views for Survey APIS
"""

import random
import string

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from survey import serializers
from survey.models import Code, Survey


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = "".join(random.choice(letters) for i in range(length))
    return result_str


# Create your views here.
class CreateSurvey(generics.CreateAPIView):
    """
    View to Create and List Survey

    `voters`: Number of voters.
    """

    queryset = Survey.objects.all()
    serializer_class = serializers.SurveySerializer

    def perform_create(self, serializer):
        """
        Create user codes for Survey
        """

        number_of_voters = self.request.data["voters"]

        serializer.save()

        for i in range(number_of_voters):
            code = get_random_string(4)
            Code.objects.create(survey=serializer.instance, code=code.upper())


class ListSurvey(generics.ListAPIView):
    """
    View to Create and List Survey
    """

    queryset = Survey.objects.all()
    serializer_class = serializers.SurveySerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id"]


class CreateQuestion(generics.CreateAPIView):
    """
    View to Create and Question

    """

    serializer_class = serializers.QuestionSerializer
