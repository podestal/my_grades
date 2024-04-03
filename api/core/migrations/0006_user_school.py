# Generated by Django 5.0.2 on 2024-04-03 12:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_user_profile'),
        ('my_grades_api', '0009_alter_tutor_first_name_alter_tutor_last_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='school',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='my_grades_api.school'),
            preserve_default=False,
        ),
    ]
