from survey.models import Code, Question, Survey
from django.contrib import admin


class SurveyAdmin(admin.ModelAdmin):
    list_display = ("created_at", "updated_at", "title")


class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "updated_at",
    )


class CodeAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "updated_at",
    )


# The model followed by class name (model, class name)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Code, CodeAdmin)
