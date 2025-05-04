from django.urls import path
from . import views

urlpatterns = [
    path('', views.getShoes),
    path('add/', views.addShoe)
]