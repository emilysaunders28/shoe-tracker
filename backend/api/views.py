from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import ShoeSerializer, UserSerializer
from shoes.models import Shoe
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny])
def get_shoes(request):
    items = Shoe.objects.order_by('?')[:5]
    serializer = ShoeSerializer(items, many=True)
    return Response(serializer.data)




@api_view(['POST'])
def add_shoe(request):
    serializer = ShoeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)
    


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Invalid Credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        request.user.auth_token.delete()
        return Response({
            'message': 'Logged out successfully'
        }, status=status.HTTP_200_OK)
    except (AttributeError, Token.DoesNotExist):
        return Response({
            'error': 'Token not found'
        }, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user(request):
    user = request.user
    if user and user.is_authenticated:
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    else:
        return Response({"username": None, "user_id": None})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_shoes(request):
    user = request.user
    user_shoes = user.shoes.all()

    return


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_user_shoe(request):
    return


@api_view(['POST'])
@permission_classes([AllowAny])
def search(request):
    search_term = request.data.get('search', '')
    if not search_term:
        return Response({'error': 'Search term is required'}, status=status.HTTP_400_BAD_REQUEST)
    shoes = Shoe.objects.filter(
        name__icontains=search_term
    ) | Shoe.objects.filter(
        brand__icontains=search_term
    )

    serializer = ShoeSerializer(shoes, many=True)
    return Response(serializer.data)