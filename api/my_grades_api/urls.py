from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('areas', views.AreaViewSet)
router.register('schools', views.SchoolViewSet)
router.register('competences', views.CompetenceViewSet)
router.register('capacities', views.CapacityViewSet, basename='capacities')
router.register('clases', views.ClaseViewSet, basename='clases')
router.register('instructors', views.InstructorViewSet, basename='instructors')
router.register('categories', views.CategoryViewSet, basename='categories')
router.register('assignatures', views.AssignatureViewSet, basename='assignatures')
router.register('activities', views.ActivityViewSet, basename='activities')
router.register('grades', views.GradesViewSet)
router.register('atendances', views.AtendanceViewSet)
router.register('students', views.StudentViewSet)
router.register('tutors', views.TutorViewSet)
router.register('tutorAssignatures', views.SimpleAssignatureViewSet)
router.register('participations', views.ParticipationViewSet)
router.register('annunciations', views.AnnouncementViewSet, basename='annunciations')
router.register('averages', views.QuarterGradeViewSet, basename='averages')

annunciation_router = routers.NestedDefaultRouter(router, 'annunciations', lookup='annunciations')
annunciation_router.register('images', views.AnnunciationImagesViewSet, basename='annunciations-images')

# competences_router = routers.NestedDefaultRouter(router, 'competences', lookup='competence') 
# competences_router.register('capacities', views.CapacityViewSet, basename='capacities')

# router.register('assignments', views.AssignmentViewSet)
# router.register('students', views.StudentViewSet)
# router.register('competences', views.CompetenceViewSet, basename='competences')
# router.register('grades', views.AllGradesViewSet)

# assignments_router = routers.NestedDefaultRouter(router, 'assignments', lookup='assignment')
# assignments_router.register('grades', views.GradeViewSet, basename='grades')

# urlpatterns = router.urls + assignments_router.urls

urlpatterns = router.urls + annunciation_router.urls