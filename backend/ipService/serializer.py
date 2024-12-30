from .models import IpStatus,Ip_analysis
from rest_framework import serializers

class IpStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = IpStatus
        fields = '__all__'

class IpAnalysisSerializer(serializers.ModelSerializer):
    statusName = serializers.CharField(source='status.name', allow_null=True)
    class Meta:
        model = Ip_analysis
        fields = ['id', 'ip', 'countryCode', 'repPoints', 'status', 'statusName', 'latitude', 'longitude']
