import json

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
@api_view(["POST"])
@csrf_exempt
def survey_vote(request, survey_id):
    if request.method == "POST":
        print(survey_id)
        data = json.loads(request.body)

        print(data)

        d = {"message": "Hello JsonResponse"}

        # JsonResponse
        return Response({"detail": "Voted successfully."}, status=status.HTTP_200_OK)
