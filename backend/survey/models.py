from django.db import models

from voting_app.base.models import BaseModel


class Survey(BaseModel):
    """
    Model for Survey
    """

    class Meta:
        verbose_name_plural = "Survey"

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Question(BaseModel):
    """
    Questions Model for Survey
    """

    class Meta:
        verbose_name_plural = "Question"

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
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
