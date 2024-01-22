from rest_framework.viewsets import ModelViewSet
from . import models
from . import serializers

class GradeViewSet(ModelViewSet):
    queryset = models.Grade.objects.all()
    serializer_class = serializers.GradeSerializer

class AssignatureViewSet(ModelViewSet):
    queryset = models.Assignature.objects.all()
    serializer_class = serializers.AssignatureSerializer

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
