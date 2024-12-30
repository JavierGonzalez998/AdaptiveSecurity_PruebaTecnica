from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Dog, DogStatus
from .serializer import DogSerializer, DogStatusSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from userService.utils import get_user_id_from_request
from userService.models import User
from rest_framework.pagination import PageNumberPagination

class DogPagination(PageNumberPagination):
    page_size = 10  # Número de elementos por página
    page_size_query_param = 'page_size'  # Permite pasar un parámetro de tamaño de página
    max_page_size = 100  # Máximo número de elementos por página

class DogList(APIView):
    def get(self, request):
        dogs = Dog.objects.all()  # Obtén todos los perros
        paginator = DogPagination()  # Usamos la clase de paginación
        result_page = paginator.paginate_queryset(dogs, request)  # Pagina los resultados
        if result_page is not None:
            # Si hay una página de resultados, devolvemos los datos paginados
            serializer = DogSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        # Si no hay paginación, devolvemos todos los resultados
        serializer = DogSerializer(dogs, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        #logica para crear un perro
        serializer = DogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Para GET, no requerimos autenticación. Para POST, requerimos autenticación con JWT
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        elif self.request.method == 'POST':
            return [IsAuthenticated()]
        return super().get_permissions()
    
class DogDetail(APIView):
    def get(self, request, pk):
        dog = Dog.objects.filter(pk=pk).first()
        if not dog:
            return Response({'error': 'dog not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = DogSerializer(dog)
        return Response(serializer.data)

    def put(self, request, pk):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        #logica para actualizar un perro
        dog = Dog.objects.filter(pk=pk).first()
        if not dog:
            return Response({'error': 'dog not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = DogSerializer(dog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 1:
            return Response({'error': 'user is not an admin'}, status=status.HTTP_401_UNAUTHORIZED)
        #logica para eliminar un perro
        dog = Dog.objects.filter(pk=pk).first()
        if not dog:
            return Response({'error': 'dog not found'}, status=status.HTTP_404_NOT_FOUND)
        dog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    # Para GET, no requerimos autenticación. Para POST, requerimos autenticación con JWT
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        elif self.request.method == 'DELETE':
            return [IsAuthenticated()]
        elif self.request.method == 'PUT':
            return [IsAuthenticated()]
        return super().get_permissions()

class DogsByUser(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador o voluntario
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        
        dogs = Dog.objects.filter(adopted_by=id)
        serializer = DogSerializer(dogs, many=True)
        return Response(serializer.data)
    
    def get_permissions(self):
        return [IsAuthenticated()]
    
class AdoptDog(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador o voluntario
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 3:
            return Response({'error': 'user not volunteer'}, status=status.HTTP_401_UNAUTHORIZED)
        param = request.GET.get('name', None)
        if param:
            dogs = Dog.objects.filter(status=2, name__icontains=param)
            serializer = DogSerializer(dogs, many=True)
            return Response(serializer.data)
        dogs = Dog.objects.filter(status = 2).all()
        serializer = DogSerializer(dogs, many=True)
        return Response(serializer.data)

    def post(self, request):
        id = get_user_id_from_request(request)
        dogId = request.data["id"]
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador o voluntario
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        dogs = Dog.objects.filter(id=dogId, adopted_by__isnull=False)
        if dogs:
            return Response({'error': 'Dog has been adopted'}, status=status.HTTP_404_NOT_FOUND)
        editDog = Dog.objects.filter(id=dogId).first()
        data = {"status": 2, "adopted_by":id}
        serializer = DogSerializer(editDog, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status":200 ,"data":serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return super().get_permissions()

class VerifyIsAdopted(APIView):
    def get(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador o voluntario
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND) 
        dog = Dog.objects.filter(adopted_by=id, status=2).first()
        is_adopted = dog is not None 
        print(is_adopted)
        return Response({'is_adopted': is_adopted}, status=status.HTTP_200_OK)
        
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return super().get_permissions()

class ConfirmAdopt(APIView):
    def post(self, request):
        id = get_user_id_from_request(request)
        user = User.objects.filter(pk=id).first()
        # Verificar si el usuario es un administrador o voluntario
        if not user:
            return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        if int(user.role.id) != 3:
            return Response({'error': 'user not volunteer'}, status=status.HTTP_401_UNAUTHORIZED)
        dogId = request.data["dog_id"]
        editDog = Dog.objects.filter(id=dogId).first()
        data = {"status": 3}
        serializer = DogSerializer(editDog, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status":200 ,"data":serializer.data}, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return super().get_permissions()
