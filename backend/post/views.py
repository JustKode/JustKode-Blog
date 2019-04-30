from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from board.models import Category, SubCategory
from post.serializer import PostSerializer, CommentSerializer, CommentPostSerializer, CommentWithChildSerializer, SubCommentSerializer
from post.models import Post, Comment, SubComment


class PostView(APIView):
    def get(self, request, id, format=None):
        try:
            post = Post.objects.get(pk=id)
            post_serializer = PostSerializer(post)

            comments = Comment.objects.filter(post=post)
            comment_serializer = CommentWithChildSerializer(comments, many=True)
            return Response({
                'post': post_serializer.data,
                'comments': comment_serializer.data 
            })
        except Post.DoesNotExist:
            return Response({"message": "post does not exist"}, status=status.HTTP_404_NOT_FOUND)


class CommentView(APIView):
    def get(self, request, id):
        try:
            post = Post.objects.get(pk=id)
            post_serializer = PostSerializer(post)

            comments = Comment.objects.filter(post=post)
            comment_serializer = CommentWithChildSerializer(comments, many=True)
            return Response(comment_serializer.data)
        except Post.DoesNotExist:
            return Response({"message": "post does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, id):
        """
        필요 키 : writer, password, email, content
        """
        try:
            post = Post.objects.get(pk=id)
            temp_dict = {'post': id}
            temp_dict.update(request.data)
            print(temp_dict)

            comment = CommentPostSerializer(data=temp_dict)
            if comment.is_valid():
                comment.save()
                return Response(comment.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({"message": "post error"}, status=status.HTTP_404_NOT_FOUND)

