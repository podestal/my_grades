from django.db import models
from django.conf import settings

class School(models.Model):

    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
    
class Clase(models.Model):

    GRADE_FIRST = '1'
    GRADE_SECOND = '2'
    GRADE_THIRD = '3'
    GRADE_FOURTH = '4'
    GRADE_FIFTH = '5'
    GRADE_SIXTH = '6'

    GRADE_CHOICES = [
        (GRADE_FIRST, 'First'),
        (GRADE_SECOND, 'Second'),
        (GRADE_THIRD, 'Third'),
        (GRADE_FOURTH, 'Fourth'),
        (GRADE_FIFTH, 'Fifth'),
        (GRADE_SIXTH, 'Sixth'),
    ]

    LEVEL_PRIMARY = 'P'
    LEVEL_SECONDARY = 'S'

    LEVEL_CHOICES = [
        (LEVEL_PRIMARY, 'Primary'),
        (LEVEL_SECONDARY, 'Secondary')
    ]

    bulk = models.BooleanField()
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    grade =  models.CharField(max_length=1, choices=GRADE_CHOICES, null=True, blank=True)
    level = models.CharField(max_length=1, choices=LEVEL_CHOICES)
    section = models.CharField(max_length=1, default='A')

    def __str__(self):
        return f'{self.title}-{self.section}'

class Instructor(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE )

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

class Assignature(models.Model):
    title = models.CharField(max_length=255)
    clase =  models.ForeignKey(Clase, on_delete=models.CASCADE)
    Instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        return self.title
    
class Student(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    clase = models.ForeignKey(Clase, on_delete=models.PROTECT, related_name='students')

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

class Assignment(models.Model):

    ASSIGNMENT_TYPE_PROJECT = 'P'
    ASSIGNMENT_TYPE_QUIZZ = 'Q'
    ASSIGNMENT_TYPE_TEST = 'T'
    ASSIGNMENT_TYPE_HOMEWORK = 'H'

    ASSIGNMENT_TYPE_CHOICES = [
        (ASSIGNMENT_TYPE_PROJECT, 'Project'),
        (ASSIGNMENT_TYPE_QUIZZ, 'Quizz'),
        (ASSIGNMENT_TYPE_TEST, 'Test'),
        (ASSIGNMENT_TYPE_HOMEWORK, 'Homework')
    ]

    CALIFICATION_CHOICES = [
        ('AD', 'AD'),
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C')
    ]

    title = models.CharField(max_length=255)
    assignment_type = models.CharField(max_length=1, choices=ASSIGNMENT_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    assignature = models.ForeignKey(Assignature, on_delete=models.PROTECT)
    clase = models.ForeignKey(Clase, on_delete=models.PROTECT)
    student = models.ForeignKey(Student, on_delete=models.PROTECT)
    califaction = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, blank=True, null=True)

    def __str__(self):
        return self.title
    
class Atendance(models.Model):

    created_at = models.DateField(auto_now_add=True)
    status = models.BooleanField(default=True)
    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='atendances')
