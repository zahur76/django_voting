from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    message = "Check if user admin"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Check permissions for read-only request
            return True
        # Check permissions for write request
        return bool(request.user and request.user.is_staff)
