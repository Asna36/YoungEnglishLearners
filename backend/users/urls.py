from django.contrib import admin
from django.urls import path, include
from .views import RegisterViewset, LoginViewset, get_logged_in_user, get_greeting_audio

urlpatterns = [
    path('register/', RegisterViewset.as_view({'post': 'create'}), name='register'),
    path('login/', LoginViewset.as_view({'post': 'create'}), name='login'),
    path('get_logged_in_user/', get_logged_in_user, name='get_logged_in_user'),
    path('get_greeting_audio/<str:username>/', get_greeting_audio, name='get_greeting_audio'),
]
