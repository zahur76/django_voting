import random
import string

from django.contrib.auth.models import User
from django.db import models

from voting_app.base.models import BaseModel


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = "".join(random.choice(letters) for i in range(length))
    print("Random string of length", length, "is:", result_str)


class Survey(BaseModel):
    """
    Model for Survey
    """

    class Meta:
        verbose_name_plural = "Survey"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="survey")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    voters = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Option(BaseModel):
    """
    Model to add options to survey
    """

    class Meta:
        verbose_name_plural = "Option"

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    option = models.CharField(max_length=255)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.survey.title


class Code(BaseModel):
    """
    Survey Code to allow voting
    """

    class Meta:
        verbose_name_plural = "Code"

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    code = models.CharField(max_length=4)

    def __str__(self):
        return self.survey.title
