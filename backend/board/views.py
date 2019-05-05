from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from board.models import Category, SubCategory
from board.serializer import CategorySerializer, CategoryWithChildSerializer, SubCategorySerializer
from post.serializer import PostSimpleSerializer
from post.models import Post, Comment, SubComment


class AllPostView(APIView):
    def get(self, request, page=1, format=None):
        posts = Post.objects.all()[(page-1)*10:page*10]
        serializer = PostSimpleSerializer(instance=posts, many=True)
        return Response(serializer.data)


class BoardListView(APIView):
    def get(self, request, format=None):
        categorys = Category.objects.all()
        serializer = CategoryWithChildSerializer(instance=categorys, many=True)
        return Response(serializer.data)


class CategoryListView(APIView):
    def get(self, request, url, format=None):
        try:
            category = Category.objects.get(url=url)
            serializer = CategoryWithChildSerializer(instance=category)
            return Response(serializer.data)
        except Category.DoesNotExist:
            return Response({"message": "category does not exist"}, status=status.HTTP_404_NOT_FOUND)


class CategoryView(APIView):
    def get(self, request, url, page=1, format=None):
        try:
            category = Category.objects.get(url=url)
            categorySerializer = CategorySerializer(instance=category)

            posts = Post.objects.filter(board__parent=category).order_by('-writedAt')[(page-1)*10:page*10]
            postSerializer = PostSimpleSerializer(instance=posts, many=True)
            return Response({
                'category': categorySerializer.data,
                'posts': postSerializer.data
            })
        except Category.DoesNotExist:
            return Response({"message": "category does not exist"}, status=status.HTTP_404_NOT_FOUND)


class SubCategoryView(APIView):
    def get(self, request, category_url, subcategory_url, page=1, format=None):
        try:
            category = Category.objects.get(url=category_url)
            subcategory = SubCategory.objects.get(url=subcategory_url, parent=category)
            subcategorySerializer = SubCategorySerializer(instance=subcategory)

            posts = Post.objects.filter(board=subcategory).order_by('-writedAt')[(page-1)*10:page*10]
            postSerializer = PostSimpleSerializer(instance=posts, many=True)
            return Response({
                'category': subcategorySerializer.data,
                'posts': postSerializer.data
            })
        except Category.DoesNotExist:
            return Response({"message": "category does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except SubCategory.DoesNotExist:
            return Response({"message": "subcategory does not exist"}, status=status.HTTP_404_NOT_FOUND)

    
