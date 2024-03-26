# Generated by Django 5.0.2 on 2024-03-26 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_grades_api', '0003_activity_created_at_activity_due_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='instructor',
            name='is_instructor',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='student',
            name='is_student',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='tutor',
            name='is_tutor',
            field=models.BooleanField(default=True),
        ),
    ]
