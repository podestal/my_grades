from rest_framework import serializers
from . import models

class GradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Grade
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):

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

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Student
        fields = '__all__'