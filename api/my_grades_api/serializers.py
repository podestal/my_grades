from rest_framework import serializers
from core.serializers import GetUserSerializer
from . import models

class GetAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Area
        fields = '__all__'

class SchoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.School
        fields = '__all__'

class GetCompetenciesSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Competence
        fields = '__all__'

class GetCapacitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Capacity
        fields = '__all__'

class GetClaseSerializer(serializers.ModelSerializer):

    title = serializers.SerializerMethodField('get_title')

    class Meta:
        model = models.Clase
        fields = ['id', 'title', 'level', 'grade', 'section', 'school']

    def get_title(self, clase=models.Clase):
        return f'{clase.grade}-{clase.section}'
    
class GetSimpleClaseSerializer(serializers.ModelSerializer):

    title = serializers.SerializerMethodField('get_title')

    class Meta:
        model = models.Clase
        fields = ['id', 'title', 'level']

    def get_title(self, clase=models.Clase):
        return f'{clase.grade}-{clase.section}'

class GetInstructorSerializer(serializers.ModelSerializer):

    user = GetUserSerializer()

    class Meta:
        model = models.Instructor
        fields = ['id', 'first_name', 'last_name', 'user', 'school']

class CreateInstructorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Instructor
        fields = ['id', 'first_name', 'last_name', 'user', 'school']


class GetCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Category
        fields = '__all__'

class CreateCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Category
        fields = ['id', 'title', 'weight']

    def create(self, validated_data):
        user_id = self.context['user']
        return models.Category.objects.create(user_id = user_id, **validated_data)

class GetAssignatureSerializer(serializers.ModelSerializer):

    clase = GetSimpleClaseSerializer()

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'Instructor', 'area', 'clase']

class CreateAssignatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'Instructor', 'area', 'clase']

class GetSimpleAssignatureSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Assignature
        fields = ['id', 'title', 'area']


class GetActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Activity
        fields = ['id', 'title', 'created_at', 'due_date', 'assignature', 'competences', 'description', 'quarter', 'category', 'my_choices']

class CreateActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Activity
        fields = ['id','title', 'due_date', 'assignature', 'competences', 'description', 'quarter', 'category', 'my_choices']

    # def create(self, validated_data):

    #     print('Validated data', validated_data)
    #     competence_set = set()
    #     for competence in validated_data.get('competence'):
    #         competence_set.add(competence.id)
    #     print('competence_set', competence_set)
    #     activity = models.Activity.objects.create(competence=validated_data.get('competence'), **validated_data)
        # assignature = validated_data['assignature']
        # clase_id = validated_data['assignature'].clase.id
        # students = models.Student.objects.filter(clase=clase_id)

        # grades = [models.Grade(
        #     activity=activity,
        #     student = student,
        #     assignature = assignature
        # ) for student in students]

        # models.Grade.objects.bulk_create(grades)
        # return activity
    
class GetAtendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Atendance
        fields = '__all__'

class GetSimpleAttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Atendance
        fields = ['id', 'created_at', 'status', 'hour']

class GetParticipationSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Participation
        fields = '__all__'

class GetSimpleActivityHeaderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Activity
        fields = ['id', 'category']

class GetSimpleGradesSerializer(serializers.ModelSerializer):

    # activity = GetSimpleActivityHeaderSerializer()

    class Meta:
        model = models.Grade
        fields = ['id', 'activity', 'calification']

class GetQuarterGradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.QuarterGrade
        fields = '__all__'

class GetStudentSerializer(serializers.ModelSerializer):

    atendances = GetSimpleAttendanceSerializer(many=True)
    participations = GetParticipationSerializer(many=True)
    grades= GetSimpleGradesSerializer(many=True)
    averages= GetQuarterGradeSerializer(many=True)

    class Meta:
        model = models.Student
        fields = ['id', 'first_name', 'last_name', 'clase', 'school', 'atendances', 'participations', 'grades', 'averages']

class CreateStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'first_name', 'last_name', 'clase', 'school']

class GetSimpleStudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Student
        fields = ['id', 'first_name', 'last_name']


class GetFullDetailStudentSerializer(serializers.ModelSerializer):

    atendances = GetSimpleAttendanceSerializer(many=True)
    clase = GetSimpleClaseSerializer()

    class Meta:
        model = models.Student
        fields = ['id', 'first_name', 'last_name', 'atendances', 'clase']

class GetSimpleActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Activity
        fields = ['id', 'title', 'competence', 'capacity', 'description', 'quarter', 'category']

class GetGradeSerializer(serializers.ModelSerializer):

    student = GetSimpleStudentSerializer()
    activity = GetSimpleActivitySerializer()

    class Meta:
        model = models.Grade
        fields = ['id', 'calification', 'activity', 'student', 'assignature', 'observations']

class UpdateGradeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Grade
        fields = ['id', 'calification', 'observations']

class GetTutorSerializer(serializers.ModelSerializer):

    students = GetFullDetailStudentSerializer(many=True)

    class Meta:
        model = models.Tutor
        fields = ['id', 'students']

class GetAllAnnouncementAllDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Annunciation
        fields = ['id', 'title', 'description', 'created_at', 'user', 'clase']

class GetAnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Annunciation
        fields = ['id', 'title', 'description', 'created_at', 'clase']

class CreateAnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Annunciation
        fields = ['id', 'title', 'description', 'created_at', 'clase']

    def create(self, validated_data):
        
        user_id = self.context['user_id']
        return models.Annunciation.objects.create(user_id = user_id, **validated_data)
    



# class CreateAssignmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Assignment
#         fields = ['title', 'due_date', 'competence', 'assignature']

#     def create(self, validated_data):

#         assignment = models.Assignment.objects.create(**validated_data)
#         assignature_id = assignment.assignature.id
#         assignature = models.Assignature.objects.get(id=assignature_id)
#         clase_id = assignature.clase.id
#         students = models.Student.objects.filter(clase=clase_id)


#         grades = [models.Grade(
#             assignment=assignment,
#             student = student,
#             assignature = assignature
#         ) for student in students]

#         models.Grade.objects.bulk_create(grades)
#         return assignment

# class CreateClaseSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Clase
#         fields = ['bulk', 'level', 'grade', 'section', 'school']

#     def save(self, **kwargs):

#         if self.validated_data.get('bulk') == True:
#             if self.validated_data.get('level') == 'P':
#                 clases = [models.Clase(
#                     **self.validated_data,
#                     grade = str(i + 1),
#                 ) for i in range(0, 6)]
#                 return models.Clase.objects.bulk_create(clases)
#             else:
#                 clases = [models.Clase(
#                     **self.validated_data,
#                     grade = str(i + 1),
#                 ) for i in range(0, 5)]
#                 return models.Clase.objects.bulk_create(clases)
#         else:
#             return models.Clase.objects.create(**self.validated_data)
        

# class SimpleStudentSerializer(serializers.ModelSerializer):

#     user = GetUserSerializer()

#     class Meta:
#         model = models.Student
#         fields = ['id', 'user']

# class GetInstructorSerializer(serializers.ModelSerializer):

#     user = GetUserSerializer()

#     class Meta:
#         model = models.Instructor
#         fields = ['id', 'user']

# class CreateInstructorSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Instructor
#         fields = ['user', 'school']

# class CreateAssignatureSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Assignature
#         fields = ['title', 'clase', 'Instructor']

# class SimpleClaseSerializer(serializers.ModelSerializer):

#     title = serializers.SerializerMethodField('get_title')

#     class Meta:
#         model = models.Clase
#         fields = ['id', 'title', 'level']

#     def get_title(self, clase=models.Clase):
#         return f'{clase.grade}-{clase.section}'
    

# class GetAssignatureAsTutorSerializer(serializers.ModelSerializer):

#     Instructor = GetInstructorSerializer()

#     class Meta:
#         model = models.Assignature
#         fields = ['id', 'title', 'Instructor']

# class GetAssignatureAsInstructorSeralizer(serializers.ModelSerializer):

#     clase = SimpleClaseSerializer()
#     class Meta:
#         model = models.Assignature
#         fields = ['id', 'title', 'clase']

# class GetCompetenceSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Competence
#         fields = ['id', 'title', 'value', 'instructor']

# class CreateCompetenceSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Competence
#         fields = ['id', 'title', 'value']

#     def create(self, validated_data):
#         instructor_id = self.context['instructor_id']
#         return models.Competence.objects.create(instructor_id=instructor_id, **validated_data)

# class GetAssignmentSerializer(serializers.ModelSerializer):

#     competence = GetCompetenceSerializer()

#     class Meta:
#         model = models.Assignment
#         fields = ['id', 'title', 'created_at', 'due_date', 'competence', 'assignature']

# class CreateAssignmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Assignment
#         fields = ['title', 'due_date', 'competence', 'assignature']

#     def create(self, validated_data):

#         assignment = models.Assignment.objects.create(**validated_data)
#         assignature_id = assignment.assignature.id
#         assignature = models.Assignature.objects.get(id=assignature_id)
#         clase_id = assignature.clase.id
#         students = models.Student.objects.filter(clase=clase_id)


#         grades = [models.Grade(
#             assignment=assignment,
#             student = student,
#             assignature = assignature
#         ) for student in students]

#         models.Grade.objects.bulk_create(grades)
#         return assignment


# class UpdateAssignmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Assignment
#         fields = ['title', 'due_date', 'competence', 'assignature']


# class CreateStudentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Student
#         fields = ['clase', 'user', 'school', 'first_name', 'last_name']

# class TutorSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Tutor
#         fields = '__all__'


# class GetStudentSerializer(serializers.ModelSerializer):

#     atendances = AtendanceSerializer(many=True)

#     class Meta:
#         model = models.Student
#         fields = ['id', 'user', 'clase', 'atendances', 'first_name', 'last_name',]

# class GetSimplestudentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Student
#         fields = ['id', 'first_name', 'last_name']

# class GetGradeSerializer(serializers.ModelSerializer):

#     student = GetSimplestudentSerializer()

#     class Meta:
#         model = models.Grade
#         fields = ['id', 'calification', 'assignment', 'student', 'assignature']


# class CreateGradeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Grade
#         fields = ['student']

# class UpgradeGradeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Grade
#         fields = ['calification']

# class GetSimpleAssignmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = models.Assignment
#         fields = ['id', 'title', 'competence', 'assignature']

# class GetDetailGradeSerializer(serializers.ModelSerializer):

#     assignment = GetSimpleAssignmentSerializer()

#     class Meta:
#         model = models.Grade
#         fields = ['id', 'calification', 'assignment', 'student']