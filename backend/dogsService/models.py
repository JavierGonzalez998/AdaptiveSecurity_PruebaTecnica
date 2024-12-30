from django.db import models

class DogStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Dog(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    img = models.CharField(max_length=500)
    sex = models.CharField(max_length=1)
    status = models.ForeignKey(DogStatus, on_delete=models.CASCADE)
    adopted_by = models.ForeignKey('userService.User', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
