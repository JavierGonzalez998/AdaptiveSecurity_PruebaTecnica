# Generated by Django 5.1.4 on 2024-12-27 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dogsService', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dog',
            name='description',
        ),
        migrations.AlterField(
            model_name='dog',
            name='img',
            field=models.CharField(max_length=500),
        ),
    ]
