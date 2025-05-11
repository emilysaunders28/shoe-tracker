from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.db.models import Avg


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

    def average_rating(self):
        return UserShoe.objects.filter(shoe=self).aggregate(Avg('rating'))['rating__avg']

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    'url', 'gender'
                ],
                name='unique_shoe_basic_fields'
            )
        ]


class UserShoe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shoe = models.ForeignKey(Shoe, on_delete=models.CASCADE)
    rating = models.IntegerField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    size = models.CharField(max_length=10, null=True, blank=True)
    width = models.CharField(max_length=10, null=True, blank=True)
    favorite = models.BooleanField(default=False)
    wishlist = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'shoe')

    def __str__(self):
        return f"{self.user.username} - {self.shoe.name}"


User.add_to_class('shoes', models.ManyToManyField(Shoe, through='shoes.UserShoe'))