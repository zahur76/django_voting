from django.urls import path
from rest_framework.authtoken import views as auth_views

from user import views

urlpatterns = [
    path("create_token/", auth_views.obtain_auth_token),
    path("register_user/", views.CreateUserView.as_view()),
]
