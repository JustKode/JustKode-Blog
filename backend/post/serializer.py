from rest_framework import serializers
from board.models import Category, SubCategory
from board.serializer import SubCategorySerializer
from post.models import Post, Comment, SubComment


class PostSimpleSerializer(serializers.ModelSerializer):
    parent_url = serializers.CharField(read_only=True, source="parent.full_url")
    parent_name = serializers.CharField(read_only=True, source="parent.full_name")
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'summary', 'image', 'parent_url', 'parent_name')


class PostSerializer(serializers.ModelSerializer):
    parent_url = serializers.CharField(read_only=True, source="parent.full_url")
    parent_name = serializers.CharField(read_only=True, source="parent.full_name")
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'writedAt', 'content', 'image', 'parent_url', 'parent_name')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'post', 'writer', 'email', 'content', 'writedAt')
    

class CommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('post', 'writer', 'password', 'email', 'content')
        

class SubCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubComment
        fields = ('id', 'parent', 'writer', 'email', 'content', 'writedAt')


class CommentWithChildSerializer(serializers.ModelSerializer):
    subcomments = serializers.SerializerMethodField()

    def get_subcomments(self, instance):
        my_subcomment = SubComment.objects.filter(parent=instance)
        return SubCommentSerializer(my_subcomment, many=True).data

    class Meta:
        model = Comment
        fields = ('id', 'post', 'writer', 'password', 'email', 'content', 'writedAt', 'subcomments')  

