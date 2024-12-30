from django.urls import path
from .views import Login, Register, Logout, Admin, UserInfo, UserEditProfile,Dashboard, VolunteerRequests
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', UserInfo.as_view(), name='user'),
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', Logout.as_view(), name='logout'),
    path('admin/<int:pk>/', Admin.as_view(), name='admin'),
    path('edit/', UserEditProfile.as_view(), name='user_edit'),
    path('admin/dashboard/', Dashboard.as_view(), name='dashboard_admin'),
    path('admin/volunteers/', VolunteerRequests.as_view(), name='volunteer_requests')
]