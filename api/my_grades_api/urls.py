from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('schools', views.SchoolViewSet)
router.register('clases', views.ClaseViewSet, basename='clases')
router.register('assignatures', views.AssignatureViewSet, basename='assignatures')
router.register('assignments', views.AssignmentViewSet)
router.register('students', views.StudentViewSet)
router.register('competences', views.CompetenceViewSet, basename='competences')
router.register('instructors', views.InstructorViewSet, basename='instructors')
router.register('tutors', views.TutorViewSet)
router.register('atendances', views.AtendanceViewSet)

assignments_router = routers.NestedDefaultRouter(router, 'assignments', lookup='assignment')
assignments_router.register('grades', views.GradeViewSet, basename='grades')

urlpatterns = router.urls + assignments_router.urls