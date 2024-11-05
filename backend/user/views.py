"""
Views for the User API.
"""

from rest_framework import generics

from .serializers import UserSerializer
from rest_framework.permissions import AllowAny


class CreateUserView(generics.CreateAPIView):
    """Create a new user"""

    serializer_class = UserSerializer
    permission_classes = [AllowAny]
