"""
Serilizers for Survey
"""

from rest_framework import serializers
from survey.models import Question, Survey


class SurveySerializer(serializers.ModelSerializer):
    """Serializer for Survey"""

    questions = serializers.SerializerMethodField("survey_questions")

    def survey_questions(self, serializer):
        """Return questions for the survey"""
        return QuestionSerializer(
            Question.objects.filter(survey=serializer).all(), many=True
        ).data

    class Meta:
        model = Survey
        fields = (
            "id",
            "title",
            "description",
            "voters",
            "questions",
        )
        read_only_fields = ["id"]


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for Questions"""

    class Meta:
        model = Question
        fields = (
            "id",
            "survey",
            "question",
            "votes",
        )
        read_only_fields = ["id"]
