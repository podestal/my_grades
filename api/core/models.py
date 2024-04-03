from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from my_grades_api.models import School

class User(AbstractUser):

    STUDENT_PROFILE = 'S'
    TUTOR_PROFILE = 'T'
    INSTRUCTOR_PROFILE = 'I'
    AUXILIAR_PROFILE = 'A'

    PROFILE_CHOICES = [
        (STUDENT_PROFILE, 'Student'),
        (TUTOR_PROFILE, 'Tutor'),
        (INSTRUCTOR_PROFILE, 'Instructor'),
        (AUXILIAR_PROFILE, 'Auxiliar')
    ]

    profile = models.CharField(max_length=1, choices=PROFILE_CHOICES)
    school = models.ForeignKey(School, on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
class Group(Group):

    def __str__(self):
        return self.name




