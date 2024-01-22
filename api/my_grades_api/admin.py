from django.contrib import admin
from . import models

admin.site.register(models.Assignature)
admin.site.register(models.Assignment)
admin.site.register(models.Grade)
admin.site.register(models.Instructor)
admin.site.register(models.Student)
