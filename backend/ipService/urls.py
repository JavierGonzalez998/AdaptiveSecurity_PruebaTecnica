from django.urls import path
from .views import IPDashboard

urlpatterns = [
    path('dashboard/', IPDashboard.as_view(), name='ip_dashboard')
]