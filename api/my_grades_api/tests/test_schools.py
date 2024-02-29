from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
import pytest

@pytest.mark.django_db
class TestGetSchools:

    def test_if_user_is_anonymous_returns_200(self):
        client = APIClient()
        response = client.get('/api/schools/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/schools/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/schools/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_superuser_returns_201(self):
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.get('/api/schools/', {
            'name': 'school name'
        })
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateSchools:

    def test_if_user_is_anonymous_returns_401(self):

        client = APIClient()
        response = client.post('/api/schools/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):

        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))   
        response = client.post('/api/schools/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):

        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))   
        response = client.post('/api/schools/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_superuser_returns_201(self):

        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.post('/api/schools/', {
            'name': 'school name'
        })
        assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateSchools:
    
    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/schools/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))   
        response = client.patch('/api/schools/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))   
        response = client.patch('/api/schools/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_superuser_returns_200(self):
        school = baker.make(models.School)
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.patch(F'/api/schools/{school.id}/', {
            'name': 'another school name'
        })
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestDeleteSchools:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/schools/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))   
        response = client.delete('/api/schools/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))   
        response = client.delete('/api/schools/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_superuser_returns_200(self):
        school = baker.make(models.School)
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.delete(F'/api/schools/{school.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT

