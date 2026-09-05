from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True).select_related("category")
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"
