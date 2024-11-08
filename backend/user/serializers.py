"""
Serializers for the user API View
"""

from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer to create user objects"""

    class Meta:
        model = get_user_model()
        fields = ["email", "password", "username"]
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def create(self, validated_data):
        """Create a new user with validated data"""

        print(
            validated_data.get(
                "email",
            )
        )

        return get_user_model().objects.create_user(**validated_data)

    def validate_email(self, value):
        """Validate email length"""

        if len(value) > 50:
            raise serializers.ValidationError("Email too long")
        return value

    def update(self, instance, validated_data):
        """Update a user with validated data"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()

        return user
