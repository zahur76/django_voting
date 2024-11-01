from django.urls import path

from . import views
from .api_views import CreateQuestion, CreateSurvey, ListSurvey

urlpatterns = [
    path("create_survey/", CreateSurvey.as_view(), name="create_survey"),
    path("list_survey/", ListSurvey.as_view(), name="list_survey"),
    path("create_question/", CreateQuestion.as_view(), name="create_question"),
    path("vote/<int:survey_id>", views.survey_vote, name="create_question"),
]
