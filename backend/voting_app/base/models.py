from django.db import models


class BaseModel(models.Model):
    created_at = models.DateField(
        auto_now_add=True, help_text="Timestamp when record was created."
    )
    updated_at = models.DateField(
        auto_now=True, help_text="Timestamp when record was updated."
    )
    is_active = models.BooleanField(
        default=True, help_text="Use this boolean to soft-delete the record."
    )

    class Meta:
        abstract = True
