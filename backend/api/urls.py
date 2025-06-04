from django.urls import path
from . import views

urlpatterns = [
    path('random/', views.get_random),
    path('users/', views.get_users),
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('user/', views.get_user),
    path('search/', views.search),
    path('get_user_shoes/', views.get_user_shoes),
    path('shoe/<int:id>/', views.get_shoe_by_id),
    path('add/', views.add_user_shoe)
]