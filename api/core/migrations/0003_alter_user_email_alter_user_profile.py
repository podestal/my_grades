# Generated by Django 5.0.2 on 2024-03-27 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_user_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile',
            field=models.CharField(choices=[('S', 'Student'), ('T', 'Tutor'), ('I', 'Instructor')], max_length=1),
        ),
    ]
