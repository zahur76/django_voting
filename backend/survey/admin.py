from django.contrib import admin

from survey.models import Code, Option, Survey


class SurveyAdmin(admin.ModelAdmin):
    list_display = ("created_at", "id", "updated_at", "title")


class OptionAdmin(admin.ModelAdmin):
    list_display = ("created_at", "updated_at", "survey")


class CodeAdmin(admin.ModelAdmin):
    list_display = (
        "survey",
        "created_at",
        "updated_at",
        "code",
    )


# The model followed by class name (model, class name)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Option, OptionAdmin)
admin.site.register(Code, CodeAdmin)
