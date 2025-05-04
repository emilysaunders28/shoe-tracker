from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ShoeSerializer
from shoes.models import Shoe


@api_view(['GET'])
def getShoes(request):
    items = Shoe.objects.all()
    serializer = ShoeSerializer(items, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def addShoe(request):
    serializer = ShoeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)