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

    queryset = models.Clase.objects.select_related('school')
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

    queryset =  models.Assignature.objects.select_related('clase', 'Instructor')

    # def get_queryset(self):
    #     if self.request.user.is_superuser:
    #         return models.Assignature.objects.select_related('clase', 'Instructor')
    #     return models.Assignature.objects.filter(Instructor_id=self.request.user.id)
    
    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return[IsAuthenticated()]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateAssignatureSerializer
        return serializers.GetAssignatureSerializer
    

class AssignmentViewSet(ModelViewSet):
    queryset = models.Assignment.objects.all()
    serializer_class = serializers.AssignmentSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return[IsAuthenticated()]
    

class StudentViewSet(ModelViewSet):
    queryset = models.Student.objects.select_related('school', 'clase', 'user')
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateStudentSerializer
        return serializers.GetStudentSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

class InstructorViewSet(ModelViewSet):
    queryset = models.Instructor.objects.select_related('school').prefetch_related('user')
    permission_classes = [IsAdminUser]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateInstructorSerializer
        return serializers.GetInstructorSerializer
    
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
    
