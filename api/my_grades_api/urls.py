from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('grades', views.GradeViewSet)
router.register('assignatures', views.AssignatureViewSet)
router.register('assignments', views.AssignmentViewSet)
router.register('students', views.StudentViewSet)
router.register('instructors', views.InstructorViewSet)

urlpatterns = router.urls