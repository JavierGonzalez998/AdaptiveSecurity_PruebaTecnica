from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Role, VolunteerRequest
from .serializer import UserSerializer, RoleSerializer, VolunteerRequestSerializer
from .utils import check_password, get_user_id_from_request
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Avg, Sum, Case, When, FloatField, IntegerField
from django.db.models.functions import TruncMonth
from dogsService.models import Dog
from ipService.utils import SaveIP

class Login(APIView):
    def post(self, request):
        SaveIP(request)
        body = request.data
        email = body.get("email", None)
        password = body.get("password", None)
        if not email or not password:
            return Response({'error': 'email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        password_valid = check_password(password, user.password) if user else False
        if not password_valid:
            return Response({'error': 'email or password invalid'}, status=status.HTTP_400_BAD_REQUEST)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "status": 200,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role.name
        }, status=status.HTTP_200_OK)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return super().get_permissions()

class Register(APIView):
    def post(self, request):
        SaveIP(request)
        body = request.data
        role = Role.objects.filter(name='User').first()
        request = False

        if not role:
            return Response({'error': 'role not found'}, status=status.HTTP_404_NOT_FOUND)

        if(body['role'] == 'Volunteer'):
            request = True
        
        
        body['role'] = role.id
        print(body)
        serializer = UserSerializer(data=body)
        if serializer.is_valid():
            serializer.save()
            requestSerializer = VolunteerRequestSerializer(data={"user": serializer.data["id"], "status": "pending"})
            if requestSerializer.is_valid():
                requestSerializer.save()
            return Response({"status":200, "data":serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return super().get_permissions()

class UserEditProfile(APIView):
    def patch(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": 200,
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({'error': 'los datos no son válidos'}, status=status.HTTP_418_IM_A_TEAPOT)
    def get_permissions(self):    
        if self.request.method == 'PATCH':
            return [IsAuthenticated()]
        return super().get_permissions()

class Logout(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()  # Invalida el token
            return Response({"status":200,"message": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_permissions(self):    
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return super().get_permissions()


class UserPagination(PageNumberPagination):
    page_size = 10  # Número de elementos por página
    page_size_query_param = 'page_size'  # Permite pasar un parámetro de tamaño de página
    max_page_size = 100  # Máximo número de elementos por página


class Admin(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        users = User.objects.all()
        paginator = UserPagination()  # Usamos la clase de paginación
        result_page = paginator.paginate_queryset(users, request)  # Pagina los resultados
        if result_page is not None:
            # Si hay una página de resultados, devolvemos los datos paginados
            serializer = UserSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        # Si no hay paginación, devolvemos todos los resultados
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    def put(self, request, pk):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(pk=pk).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        user = User.objects.filter(pk=pk).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        elif self.request.method == 'DELETE':
            return [IsAuthenticated()]
        elif self.request.method == 'PUT':
            return [IsAuthenticated()]
        return super().get_permissions()
    
class Dashboard(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) == 2:
            return Response({'error': 'user is not an admin or volunteer'}, status=status.HTTP_401_UNAUTHORIZED)
        Dashboard = {}
        if(int(user.role.id) == 1):
            result = User.objects.aggregate(
                total_users=Count('id'),
                average_users=Avg('id'),
                users_with_role_2=Sum(Case(When(role_id=2, then=1), default=0)),
                users_with_role_3=Sum(Case(When(role_id=3, then=1), default=0)),
            )
            usersPerMonth =  (  User.objects.annotate(creation_month=TruncMonth('created_at'))
                                .values('creation_month')
                                .annotate(users_created=Count('id'))
                                .order_by('creation_month')
                            )
            result["usersPerMonth"] = usersPerMonth
            Dashboard["users"] = result

        result = Dog.objects.aggregate(total_dogs=Count('id'), average_dogs=Avg(1.0, output_field=FloatField()),
                total_dogs_available=Sum(Case(When(status_id=1, then=1), default=0, output_field=IntegerField())),
                total_dogs_adopted=Sum(Case(When(status_id=3, then=1), default=0, output_field=IntegerField())),
                average_dogs_adopted=Avg(Case(When(status_id=3, then=1.0), default=0, output_field=FloatField())),
                total_dogs_in_process=Sum(Case(When(status_id=2, then=1), default=0, output_field=IntegerField())),
                )
        dogByMonth = (
                Dog.objects.annotate(updated_month=TruncMonth('updated_at'))
                            .values('updated_month')
                            .annotate(
                                total_dogs_available=Sum(
                                Case(When(status_id=1, then=1), default=0, output_field=IntegerField())
                                ),
                                total_dogs_in_process=Sum(
                                    Case(When(status_id=2, then=1), default=0, output_field=IntegerField())
                                ),
                                total_dogs_adopted=Sum(
                                    Case(When(status_id=3, then=1), default=0, output_field=IntegerField())
                                ),
                            )
                            .order_by('updated_month')
                        )
        result["dogsPerMonth"] = dogByMonth
        Dashboard["dogs"] = result
        return Response(Dashboard, status=status.HTTP_200_OK)
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return super().get_permissions()

class Roles(APIView):
    def get(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)
    def post(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        elif self.request.method == 'POST':
            return [IsAuthenticated()]
        return super().get_permissions()
    
class UserInfo(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return super().get_permissions()

class VolunteerRequests(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        
        volunteers = VolunteerRequest.objects.all()
        serializer = VolunteerRequestSerializer(volunteers, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        user_id = request.data["user_id"]
        statusUpdate = {'status': 'approved'}
        volRequest = VolunteerRequest.objects.filter(user_id = user_id).first()
        serializer = VolunteerRequestSerializer(volRequest, data=statusUpdate, partial=True)
        if serializer.is_valid():
            serializer.save()
            user= User.objects.filter(id = user_id).first()
            serializer = UserSerializer(user, data={'role': 3}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 200}, status=status.HTTP_200_OK)
            
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return super().get_permissions()