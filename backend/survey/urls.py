from django.urls import path

from . import z_views
from .views import CreateOption, CreateSurvey, ListSurvey

urlpatterns = [
    path("create_survey/", CreateSurvey.as_view(), name="create_survey"),
    path("list_survey/", ListSurvey.as_view(), name="list_survey"),
    path("create_option/", CreateOption.as_view(), name="create_option"),
    path("vote/<str:survey_id>", z_views.survey_vote, name="vote"),
]
