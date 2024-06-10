# Generated by Django 5.0.6 on 2024-06-10 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_user_school'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile',
            field=models.CharField(blank=True, choices=[('S', 'Student'), ('T', 'Tutor'), ('I', 'Instructor'), ('A', 'Auxiliar'), ('P', 'Principal')], max_length=1, null=True),
        ),
    ]