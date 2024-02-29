from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from model_bakery import baker
from my_grades_api import models
import pytest

@pytest.mark.django_db
class TestGetClases:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.get('/api/clases/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.get('/api/clases/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_staff_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.get('/api/clases/')
        assert response.status_code == status.HTTP_200_OK

    def test_if_user_is_superuser_returns_200(self):
        client = APIClient()
        client.force_authenticate(user=User(is_superuser=True))   
        response = client.get('/api/clases/')
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestCreateClases:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.post('/api/clases/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.post('/api/clases/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_201(self):
        school = baker.make(models.School)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.post('/api/clases/', {
            'bulk': True,
            'school': school.pk,
            'level': 'P',
        })
        assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
class TestUpdateClases:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.patch('/api/clases/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.patch('/api/clases/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_200(self):
        clase = baker.make(models.Clase)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.patch(f'/api/clases/{clase.id}/', {
            'level': 'P',
        })
        assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
class TestDeleteClases:

    def test_if_user_is_anonymous_returns_401(self):
        client = APIClient()
        response = client.delete('/api/clases/')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_staff_returns_403(self):
        client = APIClient()
        client.force_authenticate(user=User(is_staff=False))
        response = client.delete('/api/clases/')
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_user_is_staff_returns_204(self):
        clase = baker.make(models.Clase)
        client = APIClient()
        client.force_authenticate(user=User(is_staff=True))
        response = client.delete(f'/api/clases/{clase.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT