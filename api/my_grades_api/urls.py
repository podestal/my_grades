from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('assignatures', views.AssignatureViewSet, basename='assignatures')
router.register('assignments', views.AssignmentViewSet)
router.register('students', views.StudentViewSet)
router.register('instructors', views.InstructorViewSet)
router.register('atendances', views.AtendanceViewSet)

urlpatterns = router.urls