from rest_framework import serializers
from core.serializers import GetUserSerializer
from . import models

class GradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Grade
        fields = '__all__'

class GetInstructorSerializer(serializers.ModelSerializer):

    user = GetUserSerializer()

    class Meta:
        model = models.Instructor
        fields = ['id', 'user']

class CreateInstructorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Instructor
        fields = '__all__'

class AssignatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignature
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignment
        fields = '__all__'

class CreateStudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Student
        fields = '__all__'

class GetStudentSerializer(serializers.ModelSerializer):

    grade = GradeSerializer()
    user = GetUserSerializer()

    class Meta:
        model = models.Student
        fields = ['id', 'user', 'grade']