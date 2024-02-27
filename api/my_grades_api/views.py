from rest_framework.viewsets import ModelViewSet
from . import models
from . import serializers

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

class AtendanceViewSet(ModelViewSet):
    queryset = models.Atendance.objects.all()
    serializer_class = serializers.AtendanceSerializer