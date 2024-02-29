from rest_framework import serializers
from core.serializers import GetUserSerializer
from . import models

class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.School
        fields = '__all__'

class ClaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Clase
        fields = '__all__'

class CreateClaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Clase
        fields = ['bulk', 'level', 'grade', 'section', 'school']

    def save(self, **kwargs):

        if self.validated_data.get('bulk') == True:
            if self.validated_data.get('level') == 'P':
                clases = [models.Clase(
                    **self.validated_data,
                    grade = str(i + 1),
                ) for i in range(0, 6)]
                return models.Clase.objects.bulk_create(clases)
            else:
                clases = [models.Clase(
                    **self.validated_data,
                    grade = str(i + 1),
                ) for i in range(0, 5)]
                return models.Clase.objects.bulk_create(clases)
        else:
            return models.Clase.objects.create(**self.validated_data)
        

class SimpleStudentSerializer(serializers.ModelSerializer):

    user = GetUserSerializer()

    class Meta:
        model = models.Student
        fields = ['id', 'user']

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

    clase = ClaseSerializer()
    Instructor = GetInstructorSerializer()

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'clase', 'Instructor']

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

class TutorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Tutor
        fields = '__all__'

class GetStudentSerializer(serializers.ModelSerializer):

    clase = ClaseSerializer()
    user = GetUserSerializer()
    atendances = AtendanceSerializer(many=True)

    class Meta:
        model = models.Student
        fields = ['id', 'user', 'clase', 'atendances']

