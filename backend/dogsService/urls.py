from django.urls import path
from .views import DogList, DogDetail, DogsByUser, AdoptDog, VerifyIsAdopted, ConfirmAdopt

urlpatterns = [
    path('', DogList.as_view(), name='dogs'),
    path('<int:pk>/', DogDetail.as_view(), name='dog'),
    path('user/', DogsByUser.as_view(), name='dogs_by_user'),
    path('adopt/', AdoptDog.as_view(), name='adopt'),
    path('adopt/confirm/', ConfirmAdopt.as_view(),name="confirm_adopt"),
    path('isadopted/', VerifyIsAdopted.as_view(), name='verify_is_adopted')
]