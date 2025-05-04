from rest_framework import serializers
from shoes.models import Shoe


class ShoeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shoe
        fields = '__all__'