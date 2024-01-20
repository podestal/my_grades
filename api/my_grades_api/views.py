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
    serializer_class = serializers.StudentSerializer

