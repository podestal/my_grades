from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from . import models

class GetGroupSerializer(UserSerializer):
    class Meta():
        model = models.Group
        fields = '__all__'

class GetUserSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'profile']

    def get_is_staff(self, user=models.User):
        return user.is_staff

    
class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'profile']

