from rest_framework.viewsets import ModelViewSet
from . import permissions
from . import models
from . import serializers

class SchoolViewSet(ModelViewSet):

    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer
    permission_classes = [permissions.IsSuperUserOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'delete']

class ClaseViewSet(ModelViewSet):

    queryset = models.Clase.objects.all()
    serializer_class = serializers.ClaseSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateClaseSerializer
        return serializers.ClaseSerializer

class AssignatureViewSet(ModelViewSet):

    def get_queryset(self):
        return models.Assignature.objects.filter(Instructor_id=self.request.user.id)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateAssignatureSerializer
        return serializers.GetAssignatureSerializer

class AssignmentViewSet(ModelViewSet):
    queryset = models.Assignment.objects.all()
    serializer_class = serializers.AssignmentSerializer

class StudentViewSet(ModelViewSet):
    queryset = models.Student.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateStudentSerializer
        return serializers.GetStudentSerializer

class InstructorViewSet(ModelViewSet):
    queryset = models.Instructor.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.GetInstructorSerializer
        return serializers.CreateInstructorSerializer
    
class TutorViewSet(ModelViewSet):

    queryset = models.Tutor.objects.all()
    serializer_class = serializers.TutorSerializer

class AtendanceViewSet(ModelViewSet):
    queryset = models.Atendance.objects.all()
    serializer_class = serializers.AtendanceSerializer