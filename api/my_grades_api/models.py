from django.db import models
from django.conf import settings

class Grade(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Instructor(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

class Assignature(models.Model):
    title = models.CharField(max_length=255)
    grade = models.ForeignKey(Grade, on_delete=models.PROTECT)
    Instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        return self.title
    
class Student(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.PROTECT, related_name='students')

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

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
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    assignature = models.ForeignKey(Assignature, on_delete=models.PROTECT)
    grade = models.ForeignKey(Grade, on_delete=models.PROTECT)
    student = models.ForeignKey(Student, on_delete=models.PROTECT)

    def __str__(self):
        return self.title
    
class Atendance(models.Model):

    created_at = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)
    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='atendances')
