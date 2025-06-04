from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import ShoeSerializer, UserSerializer, UserShoeSerializer
from shoes.models import Shoe, UserShoe
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

# Get 5 random shoes
@api_view(['GET'])
@permission_classes([AllowAny])
def get_random(request):
    items = Shoe.objects.order_by('?')[:5]
    serializer = ShoeSerializer(items, many=True)
    return Response(serializer.data)
    

# Get all users
@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# Create a user
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


# Login a user
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
    

# Logout a user
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
    

# Get user info
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
@permission_classes([AllowAny])
def get_shoe_by_id(request, id):
    try:
        shoe = Shoe.objects.get(id=id)
        serializer = ShoeSerializer(shoe)
        return Response(serializer.data)
    except Shoe.DoesNotExist:
        return Response({'error': 'Shoe not found'}, status=status.HTTP_404_NOT_FOUND)


# Get user shoes
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_shoes(request):
    user = request.user
    user_shoes = UserShoe.objects.filter(user=user).select_related('shoe')
    serializer = UserShoeSerializer(user_shoes, many=True)
    return Response(serializer.data)


# Add a user shoe
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_user_shoe(request):
    user = request.user
    shoe_id = request.data.get('shoe_id')

    try:
        shoe = Shoe.objects.get(id=shoe_id)
    except Shoe.DoesNotExist:
        return Response({'error': 'Shoe not found'}, status=status.HTTP_404_NOT_FOUND)
    
    user_shoe_data = {
        'rating': request.data.get('rating'),
        'notes': request.data.get('notes'),
        'size': request.data.get('size'),
        'width': request.data.get('width'),
        'favorite': request.data.get('favorite', False),
        'wishlist': request.data.get('wishlist', False),
    }

    user_shoe, created = UserShoe.objects.update_or_create(
        user=user,
        shoe=shoe,
        defaults=user_shoe_data
    )

    serialzier = UserShoeSerializer(user_shoe)
    if created:
        return Response(serialzier.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialzier.data, status=status.HTTP_200_OK)



# Search
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