from django.urls import path

from . import views
from .api_views import CreateOption, CreateSurvey, ListSurvey

urlpatterns = [
    path("create_survey/", CreateSurvey.as_view(), name="create_survey"),
    path("list_survey/", ListSurvey.as_view(), name="list_survey"),
    path("create_option/", CreateOption.as_view(), name="create_option"),
    path("vote/<str:survey_id>", views.survey_vote, name="vote"),
]
