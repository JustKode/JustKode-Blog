from django.contrib.auth.hashers import check_password, make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from board.models import Category, SubCategory
from post.serializer import PostSerializer, CommentSerializer, CommentPostSerializer, CommentWithChildSerializer, SubCommentSerializer, SubCommentPostSerializer
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


class PostCommentView(APIView):
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
            
            required_key = ('writer', 'password', 'email', 'content')
            if all(i in request.data for i in required_key):
                temp_dict = {'post': id}
                temp_dict.update(request.data)
                
                comment = CommentPostSerializer(data=temp_dict)
                if comment.is_valid():
                    comment.save()
                return Response(comment.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({"message": "post does not exist"}, status=status.HTTP_404_NOT_FOUND)
    

class CommentView(APIView):
    def get(self, request, id):
        try:
            comment = Comment.objects.get(pk=id)
            serializer = CommentWithChildSerializer(comment)
            return Response(serializer.data)
        except Comment.DoesNotExist:
            return Response({"message": "comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, id):
        try:
            comment = Comment.objects.get(pk=id)
            required_key = ('writer', 'password', 'email', 'content')
            if all(i in request.data for i in required_key):
                temp_dict = {'parent': id}
                temp_dict.update(request.data)

                subcomment = SubCommentPostSerializer(data=temp_dict)
                if subcomment.is_valid():
                    subcomment.save()
                return Response(subcomment.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({"message": "comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        """
        필요 키 : password, content
        """
        try:
            comment = Comment.objects.get(pk=id)
            required_key = ('password', 'content')
            if all(i in request.data for i in required_key):
                if check_password(request.data['password'], comment.password):
                    comment.content = request.data['content']
                    comment.save()
                    return Response(CommentSerializer(comment).data, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({"message": "password error"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except Comment.DoesNotExist:
            return Response({"message": "comment does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        """
        필요 키 : password
        """
        try:
            comment = Comment.objects.get(pk=id)
            required_key = ('password',)
            if all(i in request.data for i in required_key):
                if check_password(request.data['password'], comment.password):
                    comment.delete()
                    return Response({"message": "success"}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({"message": "password error"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except Comment.DoesNotExist:
            return Response({"message": "comment does not exist"}, status=status.HTTP_404_NOT_FOUND)


class SubCommentView(APIView):
    def get(self, request, id):
        try:
            subcomment = SubComment.objects.get(pk=id)
            serializer = SubCommentSerializer(subcomment)
            return Response(serializer.data)
        except SubComment.DoesNotExist:
            return Response({"message": "subcomment does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, id):
        try:
            subcomment = SubComment.objects.get(pk=id)
            required_key = ('content', 'password')
            if all(i in request.data for i in required_key):
                if check_password(request.data['password'], subcomment.password):
                    subcomment.content = request.data['content']
                    subcomment.save()
                    return Response(SubCommentSerializer(subcomment).data, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({"message": "password error"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except SubComment.DoesNotExist:
            return Response({"message": "subcomment does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, id):
        try:
            subcomment = SubComment.objects.get(pk=id)
            required_key = ('password',)
            if all(i in request.data for i in required_key):
                if check_password(request.data['password'], subcomment.password):
                    subcomment.delete()
                    return Response({"message": "success"}, status=status.HTTP_202_ACCEPTED)
                else:
                    return Response({"message": "password error"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "key error"}, status=status.HTTP_400_BAD_REQUEST)
        except SubComment.DoesNotExist:
            return Response({"message": "subcomment does not exist"}, status=status.HTTP_404_NOT_FOUND)