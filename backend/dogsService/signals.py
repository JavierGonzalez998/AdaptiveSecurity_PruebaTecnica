from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import DogStatus, Dog
from .utils import Names
import requests
@receiver(post_migrate)
def create_default_status(sender, **kwargs):
    if not DogStatus.objects.exists():
        DogStatus.objects.create(name="Disponible")
        DogStatus.objects.create(name="Pendiente de confirmación")
        DogStatus.objects.create(name="Adoptado")
        print("Default status created.")

@receiver(post_migrate)
def create_default_dogs(sender, **kwargs):
    if not Dog.objects.exists():
        for i in Names:
            url = "https://dog.ceo/api/breeds/image/random/1"
            response = requests.get(url)
            data = response.json()
            url = data["message"][0]
            Dog.objects.create(name=i["name"],sex=i["sex"], img=url, status=DogStatus.objects.get(name="Disponible"))
        print("Default dogs created.")