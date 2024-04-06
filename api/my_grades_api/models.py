from django.db import models
from django.conf import settings

class Area(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


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

    school = models.ForeignKey(School, on_delete=models.CASCADE)
    grade =  models.CharField(max_length=1, choices=GRADE_CHOICES, null=True, blank=True)
    level = models.CharField(max_length=1, choices=LEVEL_CHOICES)
    section = models.CharField(max_length=1, default='A')

    def __str__(self):
        return f'{self.grade}-{self.section}-{self.level}'

class Instructor(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='instructor')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='instructors')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Assignature(models.Model):
    title = models.CharField(max_length=255)
    clase =  models.ForeignKey(Clase, on_delete=models.CASCADE, related_name='assignatures')
    Instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, blank=True, null=True, related_name='assignatures')
    area = models.ForeignKey(Area, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Student(models.Model):

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    clase = models.ForeignKey(Clase, on_delete=models.PROTECT, related_name='students')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Tutor(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='tutors')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='tutors')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)

    # def __str__(self):
    #     return f'{self.first_name} {self.last_name}'

class Competence(models.Model):

    title = models.CharField(max_length=255)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Capacity(models.Model):

    title = models.CharField(max_length=255)
    competence = models.ForeignKey(Competence, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Activity(models.Model):

    title = models.CharField(max_length=255)
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE)
    competence = models.ForeignKey(Competence, on_delete=models.CASCADE)
    capacity = models.ForeignKey(Capacity, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    
class Atendance(models.Model):

    STATUS_CHOICES = [
        ('L', 'Late'),
        ('N', 'Not Attended'),
    ]

    created_at = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='atendances')
    hour = models.TimeField(null=True, blank=True)
    created_by = models.CharField(max_length=255)


class Grade(models.Model):

    CALIFICATION_CHOICES = [
        ('NA', 'NA'),
        ('AD', 'AD'),
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C')
    ]

    calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, default='NA')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='grades')
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE, related_name='grades')
    created_at = models.DateField(auto_now_add=True)
    observations = models.TextField(null=True, blank=True)

class Participation(models.Model):

    CALIFICATION_CHOICES = [
        ('AD', 'AD'),
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C')
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='participations')
    competence = models.ForeignKey(Competence, on_delete=models.PROTECT, null=True, blank=True)
    capacity = models.ForeignKey(Capacity, on_delete=models.PROTECT, null=True, blank=True)
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE)
    calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, default='NA')
    observations = models.TextField(null=True, blank=True)

