# Generated by Django 5.0.2 on 2024-04-04 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_grades_api', '0012_rename_student_tutor_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='is_participation',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='grade',
            name='observations',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='activity',
            name='due_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]