from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('schools', views.SchoolViewSet)
router.register('clases', views.ClaseViewSet)
router.register('assignatures', views.AssignatureViewSet, basename='assignatures')
router.register('assignments', views.AssignmentViewSet)
router.register('students', views.StudentViewSet)
router.register('competences', views.CompetenceViewSet, basename='competences')
router.register('instructors', views.InstructorViewSet, basename='instructors')
router.register('tutors', views.TutorViewSet)
router.register('atendances', views.AtendanceViewSet)

urlpatterns = router.urls