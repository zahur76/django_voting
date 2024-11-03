"""
Views for Survey APIS
"""

import random
import string

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from survey import serializers
from survey.models import Code, Survey
from survey.permissions import IsOwnerOrReadOnly


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = "".join(random.choice(letters) for i in range(length))
    return result_str


# Create your views here.
class CreateSurvey(generics.CreateAPIView):
    """
    View to Create and List Survey

    voters: Number of voters.
    """

    queryset = Survey.objects.all()
    serializer_class = serializers.SurveySerializer

    def perform_create(self, serializer):
        """
        Create user codes for Survey
        """

        serializer.save(user=self.request.user)
        number_of_voters = self.request.data["voters"]

        serializer.save()

        for i in range(number_of_voters):
            code = get_random_string(4)
            Code.objects.create(survey=serializer.instance, code=code.upper())


class ListSurvey(generics.ListAPIView):
    """
    View to Create and List Survey
    """

    serializer_class = serializers.SurveySerializer
    queryset = Survey.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id"]

    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Retrieve Survey for authenticated user.
        """

        if self.request.user.is_authenticated:
            return self.queryset.filter(user=self.request.user)
        id = self.request.GET.get("id", None)
        if id:
            return self.queryset.filter(id=id)
        return None

    def get_serializer_class(self):
        """Retrieve serializers class for request"""

        if self.request.user.is_authenticated:
            return self.serializer_class
        return serializers.SurveySerializerUser


class CreateOption(generics.CreateAPIView):
    """
    View to Create and Question

    """

    serializer_class = serializers.OptionSerializer
