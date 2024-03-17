from rest_framework import serializers
from core.serializers import GetUserSerializer
from . import models

class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.School
        fields = '__all__'

class ClaseSerializer(serializers.ModelSerializer):

    title = serializers.SerializerMethodField('get_title')


    class Meta:
        model = models.Clase
        fields = ['id', 'title', 'school', 'level', 'students']

    def get_title(self, clase=models.Clase):
        return f'{clase.grade}-{clase.section}'

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
        fields = ['user', 'school']

class CreateAssignatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignature
        fields = ['title', 'clase', 'Instructor']

class GetAssignatureAsTutorSerializer(serializers.ModelSerializer):

    Instructor = GetInstructorSerializer()

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'Instructor']

class GetAssignatureAsInstructorSeralizer(serializers.ModelSerializer):
    clase = ClaseSerializer()

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'clase']

class GetCompetenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Competence
        fields = ['id', 'title', 'value', 'instructor']

class CreateCompetenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Competence
        fields = ['title', 'value', 'instructor']

    def create(self, validated_data):
        try:
            instructor_id = self.context['instructor_id']
            return models.Competence.objects.create(instructor_id=instructor_id, **validated_data)
        except:
            return models.Competence.objects.create(**validated_data)

class GetAssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignment
        fields = ['id', 'title', 'created_at', 'due_date', 'competence', 'assignature']

class CreateAssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignment
        fields = ['title', 'due_date', 'competence', 'assignature']

    def create(self, validated_data):

        assignment = models.Assignment.objects.create(**validated_data)
        assignature_id = assignment.assignature.id
        clase_id = models.Assignature.objects.get(id=assignature_id).clase.id
        students = models.Student.objects.filter(clase=clase_id)


        grades = [models.Grade(
            assignment=assignment,
            student = student
        ) for student in students]

        models.Grade.objects.bulk_create(grades)
        return assignment


class UpdateAssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignment
        fields = ['title', 'due_date', 'competence', 'assignature']

class AtendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Atendance
        fields = '__all__'

class CreateStudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Student
        fields = ['clase', 'user', 'school']

class TutorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Tutor
        fields = '__all__'

class GetStudentSerializer(serializers.ModelSerializer):

    user = GetUserSerializer()
    atendances = AtendanceSerializer(many=True)

    class Meta:
        model = models.Student
        fields = ['id', 'user', 'clase', 'atendances']

class GetGradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Grade
        fields = ['id', 'calification', 'student', 'assignment']

class CreateGradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Grade
        fields = ['student']

