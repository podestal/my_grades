from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
from django.conf import settings
import pytest

@pytest.mark.django_db
class TestGetStudents:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/students/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/students/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/students/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_superuser_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.get('/api/students/')
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateStudents:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/students/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/students/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        clase = baker.make(models.Clase)
        school = baker.make(models.School)
        user = baker.make(settings.AUTH_USER_MODEL)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.post('/api/students/', {
            'clase': clase.pk,
            'user': user.pk,
            'school': school.pk,
        })
        print(response.data)
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestUpdateStudents:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/students/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch('/api/students/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        student = baker.make(models.Student)
        clase = baker.make(models.Clase)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/students/{student.id}/', {
            'clase': clase.pk,
        })
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestDeleteStudents:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/students/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete('/api/students/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        student = baker.make(models.Student)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/students/{student.id}/')
        assert response.status_code == status.HTTP_403_FORBIDDEN