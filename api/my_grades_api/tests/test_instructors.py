from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
from django.conf import settings
import pytest

@pytest.mark.django_db
class TestGetInstructors:

    def test_if_user_is_anonymous_returns_200(self):
        client = APIClient()
        response = client.get('/api/instructors/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/instructors/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/instructors/')
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateInstructors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/instructors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/instructors/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.post('/api/instructors/')
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestUpdateInstructors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/instructors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch('/api/instructors/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        instructor = baker.make(models.Instructor)
        school = baker.make(models.School)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/instructors/{instructor.id}/', {
            'school': school.pk,
        })
        assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
class TestDeleteInstructors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/instructors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete('/api/instructors/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        instructor = baker.make(models.Instructor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/instructors/{instructor.id}/')
        assert response.status_code == status.HTTP_403_FORBIDDEN