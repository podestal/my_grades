from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('areas', views.AreaViewSet)
router.register('schools', views.SchoolViewSet)
router.register('competences', views.CompetenceViewSet)
router.register('clases', views.ClaseViewSet, basename='clases')
router.register('instructors', views.InstructorViewSet, basename='instructors')

competences_router = routers.NestedDefaultRouter(router, 'competences', lookup='competence') 
competences_router.register('capacities', views.CapacityViewSet, basename='capacities')

# router.register('assignatures', views.AssignatureViewSet, basename='assignatures')
# router.register('assignments', views.AssignmentViewSet)
# router.register('students', views.StudentViewSet)
# router.register('competences', views.CompetenceViewSet, basename='competences')
# router.register('tutors', views.TutorViewSet)
# router.register('atendances', views.AtendanceViewSet)
# router.register('grades', views.AllGradesViewSet)

# assignments_router = routers.NestedDefaultRouter(router, 'assignments', lookup='assignment')
# assignments_router.register('grades', views.GradeViewSet, basename='grades')

# urlpatterns = router.urls + assignments_router.urls

urlpatterns = router.urls + competences_router.urls