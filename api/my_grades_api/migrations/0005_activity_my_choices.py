# Generated by Django 5.0.6 on 2024-05-14 16:42

import multiselectfield.db.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('my_grades_api', '0004_remove_activity_my_choices'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='my_choices',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('1', 'Item title 1.1'), ('2', 'Item title 1.2'), ('3', 'Item title 1.3'), ('4', 'Item title 1.4'), ('5', 'Item title 1.5')], default=1, max_length=3),
            preserve_default=False,
        ),
    ]