from rest_framework import serializers
from .models import Dog, DogStatus
from userService.models import User

class DogStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogStatus
        fields = '__all__'

class DogSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='adopted_by.get_full_name', allow_null=True)
    statusName = serializers.CharField(source='status.name', allow_null=True)
    class Meta:
        model = Dog
        fields = ['id', 'name', 'img', 'sex', 'status','statusName', 'adopted_by','owner', 'created_at', 'updated_at']
        extra_kwargs = {
            'id': {'required': False, 'read_only': True},
            'owner': {'required': False, 'read_only':True},
            'created_at': {'read_only': True},
            'updated_at': {'required': False ,'read_only': True}
        }
    def update(self, instance, validated_data):
        # Manejar campos relacionados (si es necesario)
        adopted_by_data = validated_data.pop('adopted_by', None)

        if adopted_by_data:
            instance.adopted_by = User.objects.get(pk=adopted_by_data.id)

        # Actualizar el resto de los campos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance