from .models import IpStatus, Ip_analysis
from dotenv import load_dotenv
import requests
import os
load_dotenv()

def SaveIP(request):
    ip = request.META.get('HTTP_X_FORWARDED_FOR')  # Verifica si se usa un proxy
    if ip:
        ip = ip.split(',')[0]  # En caso de múltiples IPs, toma la primera
    else:
        ip = request.META.get('REMOTE_ADDR')  # Dirección IP directa

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