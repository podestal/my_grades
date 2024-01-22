from rest_framework import serializers
from core.serializers import GetUserSerializer
from . import models

class SimpleStudentSerializer(serializers.ModelSerializer):

    user = GetUserSerializer()

    class Meta:
        model = models.Student
        fields = ['id', 'user']

class GradeSerializer(serializers.ModelSerializer):

    students = SimpleStudentSerializer(many=True)

    class Meta:
        model = models.Grade
        fields = ['id', 'title', 'description', 'students']

class GetInstructorSerializer(serializers.ModelSerializer):

    user = GetUserSerializer()

    class Meta:
        model = models.Instructor
        fields = ['id', 'user']

class CreateInstructorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Instructor
        fields = '__all__'

class CreateAssignatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignature
        fields = '__all__'

class GetAssignatureSerializer(serializers.ModelSerializer):

    grade = GradeSerializer()
    Instructor = GetInstructorSerializer()

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'grade', 'Instructor']

class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignment
        fields = '__all__'

class AtendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Atendance
        fields = '__all__'

class CreateStudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Student
        fields = '__all__'

class GetStudentSerializer(serializers.ModelSerializer):

    grade = GradeSerializer()
    user = GetUserSerializer()
    atendances = AtendanceSerializer(many=True)

    class Meta:
        model = models.Student
        fields = ['id', 'user', 'grade', 'atendances']

