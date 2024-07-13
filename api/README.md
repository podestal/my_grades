# Edumétrica API Documentation
## Table of Contents
- Introduction
- Authentication
- Endpoints
  - Areas
  - Schools
  - Clases
  - Students
  - Instructors
  - Categories
  - Tutors
  - Assignatures
  - Activities
  - Attendances
  - Grades
  - Announcements
  - Participations
  - Averages
- Models
## Introduction
This API allows managing the academic progress of students. Teachers can post information about attendances, grades, activities, and announcements, while parents can view this information.
## Authentication
This API uses JWT for authentication. To access protected endpoints, include the JWT token in the Authorization header as follows:
```
Authorization: Bearer <your-token>
```
## Endpoints
### Areas
- GET /api/areas/: Retrieve a list of areas.
- GET /api/areas/{id}/: Retrieve a specific area.
- POST /api/areas/: Create a new area.
- PATCH /api/areas/{id}/: Update a specific area.
- DELETE /api/areas/{id}/: Delete a specific area.
### School
- GET /api/schools/: Retrieve a list of schools.
- GET /api/schools/{id}/: Retrieve a specific school.
- POST /api/schools/: Create a new school.
- PATCH /api/schools/{id}/: Update a specific school.
- DELETE /api/schools/{id}/: Delete a specific school.
### Clases
- GET /api/clases/: Retrieve a list of clases.
- GET /api/clases/{id}/: Retrieve a specific clase.
- POST /api/clases/: Create a new clase.
- PATCH /api/clases/{id}/: Update a specific clase.
- DELETE /api/clases/{id}/: Delete a specific class.
### Students
- GET /api/students/: Retrieve a list of students.
- GET /api/students/{id}/: Retrieve a specific student.
- POST /api/students/: Create a new student.
- PATCH /api/students/{id}/: Update a specific student.
- DELETE /api/students/{id}/: Delete a specific student.
### Instructors
- GET /api/instructors/: Retrieve a list of instructors.
- GET /api/instructors/{id}/: Retrieve a specific instructor.
- POST /api/instructors/: Create a new instructor.
- PATCH /api/instructors/{id}/: Update a specific instructor.
- DELETE /api/instructors/{id}/: Delete a specific instructor.
### Categories
- GET /api/categories/: Retrieve a list of categories.
- GET /api/categories/{id}/: Retrieve a specific category.
- POST /api/categories/: Create a new category.
- PATCH /api/categories/{id}/: Update a specific category.
- DELETE /api/categories/{id}/: Delete a specific category.
### Tutors
- GET /api/tutors/: Retrieve a list of tutors.
- GET /api/tutors/{id}/: Retrieve a specific tutor.
- POST /api/tutors/: Create a new tutor.
- PATCH /api/tutors/{id}/: Update a specific tutor.
- DELETE /api/tutors/{id}/: Delete a specific tutor.
### Assignatures
- GET /api/assignatures/: Retrieve a list of assignatures.
- GET /api/assignatures/{id}/: Retrieve a specific assignature.
- POST /api/assignatures/: Create a new assignature.
- PATCH /api/assignatures/{id}/: Update a specific assignature.
- DELETE /api/assignatures/{id}/: Delete a specific assignature.
### Activities
- GET /api/activities/: Retrieve a list of activities.
- GET /api/activities/{id}/: Retrieve a specific activity.
- POST /api/activities/: Create a new activity.
- PATCH /api/activities/{id}/: Update a specific activity.
- DELETE /api/activities/{id}/: Delete a specific activity.
### Attendances
- GET /api/attendances/: Retrieve a list of attendances.
- GET /api/attendances/{id}/: Retrieve a specific attendance.
- POST /api/attendances/: Create a new attendance.
- PATCH /api/attendances/{id}/: Update a specific attendance.
- DELETE /api/attendances/{id}/: Delete a specific attendance.
### Grades
- GET /api/grades/: Retrieve a list of grades.
- GET /api/grades/{id}/: Retrieve a specific grade.
- POST /api/grades/: Create a new grade.
- PATCH /api/grades/{id}/: Update a specific grade.
- DELETE /api/grades/{id}/: Delete a specific grade.
### Announcements
- GET /api/announcements/: Retrieve a list of announcements.
- GET /api/announcements/{id}/: Retrieve a specific announcement.
- POST /api/announcements/: Create a new announcement.
- PATCH /api/announcements/{id}/: Update a specific announcement.
- DELETE /api/announcements/{id}/: Delete a specific announcement.
### Participations
- GET /api/participations/: Retrieve a list of participations.
- GET /api/participations/{id}/: Retrieve a specific participation.
- POST /api/participations/: Create a new participation.
- PATCH /api/participations/{id}/: Update a specific participation.
- DELETE /api/participations/{id}/: Delete a specific participation.
### Averages
- GET /api/averages/: Retrieve a list of averages.
- GET /api/averages/{id}/: Retrieve a specific average.
- POST /api/averages/: Create a new average.
- PATCH /api/averages/{id}/: Update a specific average.
- DELETE /api/averages/{id}/: Delete a specific average.
## Models
### Area
```
class Area(models.Model):
    title = models.CharField(max_length=255)
```
### School
```
class School(models.Model):
    name = models.CharField(max_length=255)
```
### Clase
```
class Clase(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    grade =  models.CharField(max_length=1, choices=GRADE_CHOICES, null=True, blank=True)
    level = models.CharField(max_length=1, choices=LEVEL_CHOICES)
    section = models.CharField(max_length=1, default='A')
```
### Instructor
```
class Instructor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='instructor')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='instructors')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
```
### Category
```
class Category(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='categories')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    weight = models.FloatField(null=True, blank=True)
```
### Assignature
```
class Assignature(models.Model):
    title = models.CharField(max_length=255)
    clase =  models.ForeignKey(Clase, on_delete=models.CASCADE, related_name='assignatures')
    Instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, blank=True, null=True, related_name='assignatures')
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
```
### Student
```
class Student(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    clase = models.ForeignKey(Clase, on_delete=models.PROTECT, related_name='students')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')
```
### Tutor
```
class Tutor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='tutors')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='tutors')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
```
### Activity
```
class Activity(models.Model):
    title = models.CharField(max_length=255)
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    quarter = models.CharField(max_length=2, choices=QUARTER_CHOICES)
    competences =  models.CharField(max_length=255)
    capacities = models.CharField(max_length=255)
```
### Atendance
```
class Atendance(models.Model):
    created_at = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)
    student = models.ForeignKey(Student, on_delete=models.PROTECT, related_name='atendances')
    hour = models.TimeField(null=True, blank=True)
    created_by = models.CharField(max_length=255)
```
### Grade
```
class Grade(models.Model):
    calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, default='NA')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='grades')
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE, related_name='grades')
    created_at = models.DateField(auto_now_add=True)
    observations = models.TextField(null=True, blank=True)
```
### QuarterGrade
```
class QuarterGrade(models.Model):
    calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES)
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='averages')
    quarter = models.CharField(max_length=2, choices=QUARTER_CHOICES)
    competence = models.CharField(max_length=255)
    conclusion = models.TextField(null=True, blank=True)
```
### Participation
```
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='participations')
    competences = models.CharField(max_length=255)
    capacities = models.CharField(max_length=255)
    assignature = models.ForeignKey(Assignature, on_delete=models.CASCADE)
    calification = models.CharField(max_length=2, choices=CALIFICATION_CHOICES, default='NA')
    observations = models.TextField(null=True, blank=True)
    created_at = models.DateField()
    quarter = models.CharField(max_length=2, choices=QUARTER_CHOICES)
```
### Announcements
class Announcements(models.Model):
```
    title = models.CharField(max_length=255)
    description = models.TextField()
    quarter = models.CharField(max_length=2, choices=QUARTER_CHOICES, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    clase = models.ForeignKey(Clase, on_delete=models.CASCADE, related_name='announcements')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='announcements')
```

