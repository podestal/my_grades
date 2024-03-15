from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
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
        return models.Assignature.objects.select_related('clase', 'Instructor').filter(Instructor_id=self.request.user.id)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateAssignatureSerializer
        if self.request.user.is_staff:
            return serializers.GetAssignatureAsInstructorSeralizer
        return serializers.GetAssignatureAsTutorSerializer
    

class AssignmentViewSet(ModelViewSet):
    queryset = models.Assignment.objects.all()
    serializer_class = serializers.AssignmentSerializer

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

    queryset = models.Competence.objects.all()
    serializer_class = serializers.GetCompetenceSerializer
    
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
    
