from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import IpStatus, Ip_analysis
from dotenv import load_dotenv
import requests
import os
load_dotenv()

@receiver(post_migrate)
def create_default_status(sender, **kwargs):
    # Lista de estado predeterminados
    default_roles = ["Confiable", "Sospechosa", "Maliciosa"]

    # Verifica si hay estados en la tabla
    if not IpStatus.objects.exists():
        for status in default_roles:
            IpStatus.objects.create(name=status)
        print("estados predeterminados creados.")

@receiver(post_migrate)
def create_default_ips(sender, **kwarsg):
    # Lista de estado predeterminados
    default_ips = ["45.79.58.198", "192.241.223.82", "103.97.215.163", "188.166.170.17", "185.220.100.255", "202.56.215.112", "31.192.105.254", "64.225.100.99", "134.209.25.165", "139.59.29.250"]

    if not Ip_analysis.objects.exists():
        for ip in default_ips:
            params = {
                    "ipAddress": ip,
                    "maxAgeInDays": 90
            }
            headers = {
                "Key": os.getenv("KEY_ABUSEIPDB"),
                "Accept": "application/json"
            }
            response = requests.get("https://api.abuseipdb.com/api/v2/check", headers=headers, params=params)
            data = response.json()
            score = 1 if data['data']['abuseConfidenceScore'] < 40 else 2 if data['data']['abuseConfidenceScore'] > 40 and data['data']['abuseConfidenceScore'] < 70 else 3
            status = IpStatus.objects.filter(id=score).first()
            query = requests.get('https://api.ip2location.io/?key='+os.getenv("KEY_GEOLOCALIZATION")+"&ip="+ip+'&format=json')
            localization = query.json()
            Ip_analysis.objects.create(ip=ip, countryCode= data['data']['countryCode'], repPoints=data['data']['abuseConfidenceScore'], status=status, latitude=localization["latitude"], longitude=localization["longitude"])