from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
from django.conf import settings
import pytest

@pytest.mark.django_db
class TestGetTutors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/tutors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/tutors/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/tutors/')
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateTutors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/tutors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/tutors/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    # user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='tutor')

    def test_if_user_is_staff_returns_200(self):
        student = baker.make(models.Student)
        user = baker.make(settings.AUTH_USER_MODEL)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.post('/api/tutors/', {
            'student': student.pk,
            'user': user.pk,
        })
        print(response.data)
        assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateTutors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/tutors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        student = baker.make(models.Student)
        tutor = baker.make(models.Tutor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch(f'/api/tutors/{tutor.id}/', {
            'student': student.pk
        })
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        student = baker.make(models.Student)
        tutor = baker.make(models.Tutor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/tutors/{tutor.id}/', {
            'student': student.pk
        })
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestDeleteTutors:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/tutors/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_204(self):
        tutor = baker.make(models.Tutor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete(f'/api/tutors/{tutor.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_if_user_is_staff_returns_204(self):
        tutor = baker.make(models.Tutor)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/tutors/{tutor.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT