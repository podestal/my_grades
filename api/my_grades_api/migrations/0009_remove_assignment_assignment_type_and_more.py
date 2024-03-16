# Generated by Django 5.0.2 on 2024-03-15 15:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_grades_api', '0008_student_school_tutor_school'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='assignment',
            name='assignment_type',
        ),
        migrations.AlterField(
            model_name='assignature',
            name='Instructor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='assignatures', to='my_grades_api.instructor'),
        ),
        migrations.AlterField(
            model_name='assignature',
            name='clase',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignatures', to='my_grades_api.clase'),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructors', to='my_grades_api.school'),
        ),
        migrations.AlterField(
            model_name='instructor',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='instructor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='student',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='my_grades_api.school'),
        ),
        migrations.AlterField(
            model_name='tutor',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tutors', to='my_grades_api.school'),
        ),
        migrations.AlterField(
            model_name='tutor',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='tutors', to='my_grades_api.student'),
        ),
        migrations.CreateModel(
            name='Competence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('value', models.FloatField()),
                ('assignature', models.ManyToManyField(blank=True, to='my_grades_api.assignature')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='my_grades_api.instructor')),
            ],
        ),
        migrations.AddField(
            model_name='assignment',
            name='competence',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='my_grades_api.competence'),
            preserve_default=False,
        ),
    ]