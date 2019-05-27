from rest_framework import serializers
from board.models import Category, SubCategory
from post.models import Post, Comment, SubComment


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('name', 'url', 'full_name', 'full_url')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'url')


class CategoryWithChildSerializer(serializers.ModelSerializer):
    subcategorys = SubCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ('name', 'url', 'subcategorys')

