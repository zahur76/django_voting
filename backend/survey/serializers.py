"""
Serilizers for Survey
"""

from typing import Dict

from rest_framework import serializers

from survey.models import Option, Survey


class SurveySerializer(serializers.ModelSerializer):
    """Serializer for Survey"""

    options = serializers.SerializerMethodField("survey_questions")

    def survey_questions(self, serializer) -> Dict[str, str]:
        """Return options for the survey"""
        return OptionSerializer(
            Option.objects.filter(survey=serializer).all(), many=True
        ).data

    class Meta:
        model = Survey
        fields = (
            "id",
            "title",
            "description",
            "voters",
            "options",
        )
        read_only_fields = ["id"]


class SurveySerializerUser(serializers.ModelSerializer):
    """Serializer for Survey for Normal Users"""

    options = serializers.SerializerMethodField("survey_questions")

    def survey_questions(self, serializer) -> Dict[str, str]:
        """Return options for the survey"""
        return OptionSerializerUser(
            Option.objects.filter(survey=serializer).all(), many=True
        ).data

    class Meta:
        model = Survey
        fields = (
            "id",
            "title",
            "description",
            "voters",
            "options",
        )
        read_only_fields = ["id"]


class OptionSerializer(serializers.ModelSerializer):
    """Serializer for Options"""

    class Meta:
        model = Option
        fields = (
            "id",
            "survey",
            "option",
            "votes",
        )
        read_only_fields = ["id"]


class OptionSerializerUser(serializers.ModelSerializer):
    """Serializer for User Options"""

    class Meta:
        model = Option
        fields = ("option",)
