from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from . import permissions
from . import models
from . import serializers

class AreaViewSet(ModelViewSet):
    queryset = models.Area.objects.all()
    serializer_class = serializers.GetAreaSerializer
    permission_classes=[permissions.IsSuperUserOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'delete']

class SchoolViewSet(ModelViewSet):

    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer
    # permission_classes = [permissions.IsSuperUserOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'delete']

class CompetenceViewSet(ModelViewSet):

    queryset = models.Competence.objects.select_related('area')
    serializer_class = serializers.GetCompetenciesSerializer
    permission_classes=[permissions.IsSuperUserOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['area']

class CapacityViewSet(ModelViewSet):

    queryset =  models.Capacity.objects.select_related('competence')
    serializer_class = serializers.GetCapacitiesSerializer
    permission_classes=[permissions.IsSuperUserOrReadOnly]
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['competence']

    # def get_queryset(self):
    #     return models.Capacity.objects.select_related('competence').filter(competence_id=self.kwargs['competence_pk'])
    
class InstructorViewSet(ModelViewSet):

    permission_classes = [permissions.IsSuperUserOrReadOnly]
    serializer_class = serializers.GetInstructorSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Instructor.objects.select_related('school', 'user')
        return models.Instructor.objects.select_related('school', 'user').filter(user_id=self.request.user.id)
    
    # def get_serializer_class(self):
    #     if self.request.method == 'POST':
    #         return serializers.CreateInstructorSerializer
    #     return serializers.GetInstructorSerializer
    
    # @action(detail=False, methods=['GET'], permission_classes=[IsAdminUser])
    # def me(self, request):
    #     instructor = models.Instructor.objects.get(user_id=self.request.user.id)
    #     serializer = serializers.GetInstructorSerializer(instructor)
    #     return Response(serializer.data)

class ClaseViewSet(ModelViewSet):

    queryset = models.Clase.objects.select_related('school').prefetch_related('assignatures', 'students')
    serializer_class = serializers.GetClaseSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['school']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [permissions.IsSuperUserOrReadOnly()]
        return[IsAuthenticated()]

#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return serializers.CreateClaseSerializer
#         return serializers.ClaseSerializer    

class AssignatureViewSet(ModelViewSet):

    serializer_class = serializers.GetAssignatureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['clase', 'Instructor']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [permissions.IsSuperUserOrReadOnly()]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return models.Assignature.objects.select_related('clase', 'Instructor', 'area')
        try:
            instructor = models.Instructor.objects.get(user_id = self.request.user.id)
            return models.Assignature.objects.select_related('clase', 'Instructor', 'area').filter(Instructor_id=instructor.id)
        except:
            print('no instructor')
            
        return models.Assignature.objects.select_related('clase', 'Instructor', 'area').filter(Instructor_id=0)

#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return serializers.CreateAssignatureSerializer
#         if self.request.user.is_staff:
#             return serializers.GetAssignatureAsInstructorSeralizer
#         return serializers.GetAssignatureAsTutorSerializer
    
class ActivityViewSet(ModelViewSet):

    queryset = models.Activity.objects.select_related('competence', 'capacity')
    serializer_class = serializers.GetActivitySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['assignature']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return serializers.CreateActivitySerializer 
        return serializers.GetActivitySerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return[IsAuthenticated()]
    
class GradesViewSet(ModelViewSet):

    queryset = models.Grade.objects.select_related('student', 'activity', 'assignature')
    serializer_class = serializers.GetGradeSerializer
    http_method_names = ['get', 'patch', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student', 'assignature', 'activity']

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return serializers.UpdateGradeSerializer
        return serializers.GetGradeSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return[IsAuthenticated()]

class AtendanceViewSet(ModelViewSet):
    queryset = models.Atendance.objects.select_related('student')
    serializer_class = serializers.GetAtendanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['created_at']
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]
    
class StudentViewSet(ModelViewSet):

    queryset = models.Student.objects.select_related('school', 'clase').prefetch_related('atendances')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['clase', 'school']
    http_method_names = ['get', 'patch', 'delete']
    serializer_class = serializers.GetStudentSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'POST', 'DELETE']:
            return [permissions.IsSuperUserOrReadOnly()]
        return[IsAuthenticated()]
    
class TutorViewSet(ModelViewSet):

    queryset = models.Tutor.objects.all()
    serializer_class = serializers.GetTutorSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE', 'GET', 'HEAD', 'OPTIONS']:
            return [IsAuthenticated()]
        return [IsAdminUser()]

# class AssignmentViewSet(ModelViewSet):

#     queryset = models.Assignment.objects.select_related('competence', 'assignature')
#     http_method_names = ['get', 'post', 'patch', 'delete']

#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['assignature']

#     def get_serializer_class(self):

#         if self.request.method == 'POST':
#             return serializers.CreateAssignmentSerializer
#         elif self.request.method == 'PATCH':
#             return serializers.UpdateAssignmentSerializer
#         return serializers.GetAssignmentSerializer

#     def get_permissions(self):
#         if self.request.method in ['PATCH', 'POST', 'DELETE']:
#             return [IsAdminUser()]
#         return[IsAuthenticated()]
    

# class StudentViewSet(ModelViewSet):

#     queryset = models.Student.objects.select_related('school', 'clase', 'user').prefetch_related('atendances')
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['clase']
#     http_method_names = ['get', 'post', 'patch', 'delete']

#     def get_permissions(self):
#         if self.request.method in ['PATCH', 'POST', 'DELETE']:
#             return [permissions.IsSuperUserOrReadOnly()]
#         return[IsAuthenticated()]
    
#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return serializers.CreateStudentSerializer
#         return serializers.GetStudentSerializer



    
    
# class CompetenceViewSet(ModelViewSet):

#     permission_classes = [IsAdminUser]
#     http_method_names = ['get', 'post', 'patch', 'delete']
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['instructor']

#     def get_queryset(self):
#         if self.request.user.is_superuser:
#             return models.Competence.objects.select_related('instructor')
#         try:
#             instructor = models.Instructor.objects.get(user_id = self.request.user.id)
#             return models.Competence.objects.select_related('instructor').filter(instructor_id=instructor.id)
#         except:
#             print('no instructor id found')
#         return models.Competence.objects.select_related('instructor').filter(instructor_id=0)
    
#     def get_serializer_class(self, *args, **kwargs):

#         if self.request.method == 'POST':
#             return serializers.CreateCompetenceSerializer
#         return serializers.GetCompetenceSerializer
    
#     def get_serializer_context(self):
#         instructor = models.Instructor.objects.get(user_id = self.request.user.id)
#         return { 'instructor_id': instructor.id }

    
# class TutorViewSet(ModelViewSet):

#     queryset = models.Tutor.objects.all()
#     serializer_class = serializers.TutorSerializer
#     http_method_names = ['get', 'post', 'patch', 'delete']

#     def get_permissions(self):
#         if self.request.method in ['PATCH', 'DELETE', 'GET', 'HEAD', 'OPTIONS']:
#             return [IsAuthenticated()]
#         return [IsAdminUser()]
    
# class GradeViewSet(ModelViewSet):

#     serializer_class = serializers.GetGradeSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['assignment']
#     http_method_names = ['get', 'post', 'patch', 'delete']

#     def get_queryset(self):
#         return models.Grade.objects.select_related('student', 'assignment').filter(assignment_id=self.kwargs['assignment_pk']) 
    
#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return serializers.CreateGradeSerializer
#         if self.request.method == 'PATCH':
#             return serializers.UpgradeGradeSerializer
#         return serializers.GetGradeSerializer

#     def get_permissions(self):
#         if self.request.method == 'GET':
#             return [IsAuthenticated()]
#         return [IsAdminUser()]
    
#     def get_serializer_context(self):
#         return {'assignment_id': self.kwargs['assignment_pk']}

# class AllGradesViewSet(ModelViewSet):

#     queryset = models.Grade.objects.select_related('student', 'assignment')
#     serializer_class = serializers.GetDetailGradeSerializer
#     http_method_names = ['get']
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['student', 'assignature']