from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from . import permissions
from . import models
from . import serializers

class SchoolViewSet(ModelViewSet):

    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer
    permission_classes = [permissions.IsSuperUserOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'delete']

class ClaseViewSet(ModelViewSet):

    queryset = models.Clase.objects.select_related('school').prefetch_related('assignatures')
    serializer_class = serializers.ClaseSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return[IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateClaseSerializer
        return serializers.ClaseSerializer

class AssignatureViewSet(ModelViewSet):

    permission_classes = [permissions.IsSuperUserOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Assignature.objects.select_related('clase', 'Instructor')
        instructor = models.Instructor.objects.get(user_id = self.request.user.id)
        return models.Assignature.objects.select_related('clase', 'Instructor').filter(Instructor_id=instructor.id)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateAssignatureSerializer
        if self.request.user.is_staff:
            return serializers.GetAssignatureAsInstructorSeralizer
        return serializers.GetAssignatureAsTutorSerializer
    

class AssignmentViewSet(ModelViewSet):

    queryset = models.Assignment.objects.select_related('competence', 'assignature')
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):

        if self.request.method == 'POST':
            return serializers.CreateAssignmentSerializer
        elif self.request.method == 'PATCH':
            return serializers.UpdateAssignmentSerializer
        return serializers.GetAssignmentSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return[IsAuthenticated()]
    

class StudentViewSet(ModelViewSet):
    queryset = models.Student.objects.select_related('school', 'clase', 'user').prefetch_related('atendances')
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateStudentSerializer
        return serializers.GetStudentSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

class InstructorViewSet(ModelViewSet):

    permission_classes = [permissions.IsSuperUserOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Instructor.objects.select_related('school', 'user')
        return models.Instructor.objects.select_related('school', 'user').filter(user_id=self.request.user.id)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateInstructorSerializer
        return serializers.GetInstructorSerializer
    
class CompetenceViewSet(ModelViewSet):

    permission_classes = [IsAdminUser]

    def get_queryset(self):

        if self.request.user.is_superuser:
            return models.Competence.objects.select_related('instructor')
        instructor = models.Instructor.objects.get(user_id = self.request.user.id)
        return models.Competence.objects.select_related('instructor').filter(instructor_id=instructor.id)
    
    def get_serializer_class(self, *args, **kwargs):

        if self.request.method == 'POST':
            return serializers.CreateCompetenceSerializer
        return serializers.GetCompetenceSerializer
    
    def get_serializer_context(self):
        instructor = models.Instructor.objects.get(user_id = self.request.user.id)
        return {'instructor_id': instructor.id}
    
class TutorViewSet(ModelViewSet):

    queryset = models.Tutor.objects.all()
    serializer_class = serializers.TutorSerializer
    
    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE', 'GET', 'HEAD', 'OPTIONS']:
            return [IsAuthenticated()]
        return [IsAdminUser()]

class AtendanceViewSet(ModelViewSet):
    queryset = models.Atendance.objects.all()
    serializer_class = serializers.AtendanceSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]
    
class GradeViewSet(ModelViewSet):

    queryset = models.Grade.objects.select_related('student', 'assignment')
    serializer_class = serializers.GetGradeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['assignment']