from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from userService.models import User
from userService.utils import  get_user_id_from_request
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Avg, Sum, Case, When, IntegerField
from .models import Ip_analysis
from .serializer import IpAnalysisSerializer

class IPDashboard(APIView):
    def get(self,request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        dashboard = {}   
        result = Ip_analysis.objects.values('countryCode').annotate(
            total_ips=Count('id'),  # Contar el total de IPs
            total_status_1=Sum(Case(When(status_id=1, then=1), default=0, output_field=IntegerField())),  # Total status 1
            total_status_3=Sum(Case(When(status_id=3, then=1), default=0, output_field=IntegerField())),  # Total status 3
            average_reputation_code=Avg('repPoints')  # Promedio de repPoints
        ).order_by('-total_ips')
        dashboard["analysis"] = result
        data = Ip_analysis.objects.all()
        dataSerializer = IpAnalysisSerializer(data, many=True)
        dashboard["data"] = dataSerializer.data
        return Response(dashboard)
    
    def get_permissions(self):    
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return super().get_permissions()