# Generated by Django 5.1.4 on 2024-12-27 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userService', '0002_session'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=300),
        ),
    ]
