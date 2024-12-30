from django.db import models

class IpStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)


class Ip_analysis(models.Model):
    id = models.AutoField(primary_key=True)
    ip = models.CharField(max_length=25)
    countryCode = models.CharField(max_length=10, null=True)
    repPoints = models.IntegerField()
    status = models.ForeignKey(IpStatus, on_delete=models.CASCADE)
    latitude = models.CharField(max_length=300, null=True)
    longitude = models.CharField(max_length=300, null=True)