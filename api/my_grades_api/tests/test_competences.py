from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
import pytest

@pytest.mark.django_db
class TestGetCompetences:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/competences/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/competences/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    # def test_if_user_is_staff_returns_200(self):

    #     client = APIClient()
    #     client.force_authenticate(user=User(is_staff=True))
    #     response = client.get('/api/competences/')
    #     assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateCompetence:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/competences/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/competences/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    # def test_if_user_is_staff_returns_201(self):
    #     instructor = baker.make(models.Instructor)
    #     client = APIClient()
    #     client.force_authenticate(user=User(is_staff=True))
    #     response = client.post('/api/competences/', {
    #         'instructor': instructor.pk,
    #         'title': 'Tareas',
    #         'value': 0.15,
    #     })
    #     assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateCompetences:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/competences/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch('/api/competences/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    # def test_if_user_is_staff_returns_200(self):
    #     competence = baker.make(models.Competence)
    #     client = APIClient()
    #     client.force_authenticate(user=User(is_staff=True))
    #     response = client.patch(f'/api/competences/{competence.id}/', {
    #         'title': 'Tests',
    #     })
    #     assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestDeleteCompetences:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/competences/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete('/api/competences/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_user_is_staff_returns_403(self):
    #     competence = baker.make(models.Competence)
#         client = APIClient()
#         client.force_authenticate(user=User(is_staff=True))
#         response = client.delete(f'/api/competences/{competence.id}/')
#         assert response.status_code == status.HTTP_403_FORBIDDEN