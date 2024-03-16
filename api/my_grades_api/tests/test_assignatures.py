from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
import pytest

@pytest.mark.django_db
class TestGetAssignatures:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/assignatures/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/assignatures/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/assignatures/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_superuser_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.get('/api/assignatures/')
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateAssignatures:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/assignatures/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/assignatures/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        clase = baker.make(models.Clase)
        instructor = baker.make(models.Instructor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.post('/api/assignatures/', {
            'title': 'Math 101',
            'clase': clase.pk,
            'Instructor': instructor.pk,
        })
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestUpdateAssignatures:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/assignatures/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch('/api/assignatures/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        assignature = baker.make(models.Assignature)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/assignatures/{assignature.id}/', {
            'title': 'Chem-101',
        })
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestDeleteAssignatures:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/assignatures/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete('/api/assignatures/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        assignature = baker.make(models.Assignature)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/assignatures/{assignature.id}/')
        assert response.status_code == status.HTTP_403_FORBIDDEN