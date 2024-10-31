from django.urls import path

from .api_views import CreateSurvey, ListSurvey, CreateQuestion

urlpatterns = [
    path("create_survey/", CreateSurvey.as_view(), name="create_survey"),
    path("list_survey/", ListSurvey.as_view(), name="list_survey"),
    path("create_question/", CreateQuestion.as_view(), name="create_question"),
]
