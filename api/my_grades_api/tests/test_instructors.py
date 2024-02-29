from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
from django.conf import settings
import pytest

@pytest.mark.django_db
class TestGetInstructors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/instructors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/instructors/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

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


    # FIX CREATE INSTRUCTOR

    # user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # school = models.ForeignKey(School, on_delete=models.CASCADE )

    # def test_if_user_is_staff_returns_201(self):
    #     school = baker.make(models.School)
    #     user = baker.make(settings.AUTH_USER_MODEL)
    #     client = APIClient()
    #     client.force_authenticate(user=User(is_staff=True))
    #     print('user', user)
    #     response = client.post('/api/instructors/', {
    #         'user': user.id,
    #         'school': school.pk,
    #     })
    #     print(response.data)
    #     assert response.status_code == status.HTTP_201_CREATED

    # def test_if_user_is_staff_returns_200(self):
    #     clase = baker.make(models.Clase)
    #     user = baker.make(settings.AUTH_USER_MODEL)
    #     client = APIClient()
    #     client.force_authenticate(user=User(is_staff=True))
    #     response = client.post('/api/students/', {
    #         'clase': clase.pk,
    #         'user': user.pk,
    #     })
    #     print(response.data)
    #     assert response.status_code == status.HTTP_201_CREATED

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

    def test_if_user_is_staff_returns_200(self):
        instructor = baker.make(models.Instructor)
        school = baker.make(models.School)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/instructors/{instructor.id}/', {
            'school': school.pk,
        })
        assert response.status_code == status.HTTP_200_OK

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

    def test_if_user_is_staff_returns_204(self):
        instructor = baker.make(models.Instructor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/instructors/{instructor.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT