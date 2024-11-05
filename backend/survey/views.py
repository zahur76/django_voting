import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from survey.models import Code, Option, Survey


@csrf_exempt
def survey_vote(request, survey_id):
    if request.method == "POST":

        data = json.loads(request.body)

        survey = Survey.objects.filter(id=survey_id).first()

        # voting logic
        # check code exists

        try:
            code = Code.objects.get(code=data["code"], survey=survey)
        except Code.DoesNotExist:
            return JsonResponse(
                {"status": "false", "detail": {"detail": "Code not found"}},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Updcate Suvey results and delete code

        option = Option.objects.filter(survey=survey, id=data["vote"]).first()
        option.votes += 1
        option.save()
        code.delete()

        return JsonResponse(
            {"status": "false", "detail": "Thanks for voting"},
            status=status.HTTP_201_CREATED,
        )
