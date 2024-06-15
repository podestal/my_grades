# Generated by Django 5.0.6 on 2024-06-14 18:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_grades_api', '0015_assignature_school'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnnunciationImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='api/images')),
                ('annunciation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='annunciation_img', to='my_grades_api.annunciation')),
            ],
        ),
    ]