from rest_framework import serializers
from shoes.models import Shoe, UserShoe
from django.contrib.auth import get_user_model

User = get_user_model()

class ShoeSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Shoe
        fields = '__all__'

    def get_average_rating(self, obj):
        return obj.average_rating()



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class UserShoeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserShoe
        fields = '__all__'
        read_only_fields = ['id']
        