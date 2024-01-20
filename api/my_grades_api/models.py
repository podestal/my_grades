from django.db import models
from django.conf import settings

class Grade(models.Model):
    title = models.CharField(max_length=255)

class Assignature(models.Model):
    title = models.CharField(max_length=255)
    grade = models.ForeignKey(Grade, on_delete=models.PROTECT)

class Assignment(models.Model):

    ASSIGNMENT_TYPE_PROJECT = 'P'
    ASSIGNMENT_TYPE_QUIZZ = 'Q'
    ASSIGNMENT_TYPE_TEST = 'T'

    ASSIGNMENT_TYPE_CHOICES = [
        (ASSIGNMENT_TYPE_PROJECT, 'Project'),
        (ASSIGNMENT_TYPE_QUIZZ, 'Quizz'),
        (ASSIGNMENT_TYPE_TEST, 'Test'),
    ]

    title = models.CharField(max_length=255)
    assignment_type = models.CharField(max_length=1, choices=ASSIGNMENT_TYPE_CHOICES)


class Student(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.PROTECT)

