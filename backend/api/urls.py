from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_shoes),
    path('add/', views.add_shoe),
    path('users/', views.get_users),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('user/', views.get_user),
]