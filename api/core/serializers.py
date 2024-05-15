from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from . import models

class GetGroupSerializer(UserSerializer):
    class Meta():
        model = models.Group
        fields = '__all__'

class GetUserSerializer(UserSerializer):

    group_name = serializers.SerializerMethodField('get_group')

    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'profile', 'first_name', 'last_name', 'school', 'group_name']

    def get_group(self, user=models.User):
        if user.groups.all():
            return user.groups.all()[0].name
        else:
            return ''

    
class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id', 'username', 'password', 'email', 'profile', 'first_name', 'last_name', 'school']

