from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
import datetime
import pytest

@pytest.mark.django_db
class TestGetAssignments:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/assignments/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/assignments/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/assignments/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_superuser_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.get('/api/assignments/')
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateAssignment:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/assignments/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/assignments/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    # title = models.CharField(max_length=255)
    # assignment_type = models.CharField(max_length=1, choices=ASSIGNMENT_TYPE_CHOICES)
    # created_at = models.DateTimeField(auto_now_add=True)
    # due_date = models.DateTimeField()
    # assignature = models.ForeignKey(Assignature, on_delete=models.PROTECT)
    # clase = models.ForeignKey(Clase, on_delete=models.PROTECT)
    # student = models.ForeignKey(Student, on_delete=models.PROTECT)
    # califaction = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, blank=True, null=True)

    def test_if_user_is_staff_returns_200(self):
        date = datetime.datetime.date
        assignature = baker.make(models.Assignature)
        clase = baker.make(models.Clase)
        student = baker.make(models.Student)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.post('/api/assignments/', {
            'title': 'Homework',
            'assignment_type': 'P',
            'assignature': assignature.pk,
            'clase': clase.pk,
            'student': student.pk,
        })
        assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateAssignments:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/assignments/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch('/api/assignments/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_200(self):
        assignment = baker.make(models.Assignment)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/assignments/{assignment.id}/', {
            'title': 'Project',
        })
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestDeleteAssignments:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/assignments/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete('/api/assignments/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_204(self):
        assignment = baker.make(models.Assignment)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/assignments/{assignment.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT