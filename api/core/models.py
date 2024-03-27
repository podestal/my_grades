from django.db import models
from django.contrib.auth.models import AbstractUser, Group

class User(AbstractUser):

    STUDENT_PROFILE = 'S'
    TUTOR_PROFILE = 'T'
    INSTRUCTOR_PROFILE = 'I'

    PROFILE_CHOICES = [
        (STUDENT_PROFILE, 'Student'),
        (TUTOR_PROFILE, 'Tutor'),
        (INSTRUCTOR_PROFILE, 'Instructor'),
    ]

    profile = models.CharField(max_length=1, choices=PROFILE_CHOICES)

    def __str__(self):
        return self.username
    
class Group(Group):

    def __str__(self):
        return self.name




