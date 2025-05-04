from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Shoe(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    url = models.URLField()
    image_src = models.URLField(blank=True)
    gender = models.CharField(max_length=10)
    sizes = ArrayField(models.CharField(max_length=10), blank=True, default=list)
    widths = ArrayField(models.CharField(max_length=10), blank=True, default=list)
    specs = models.JSONField(blank=True, default=dict)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    'url', 'gender'
                ],
                name='unique_shoe_basic_fields'
            )
        ]