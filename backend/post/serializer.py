from rest_framework import serializers
from board.models import Category, SubCategory
from board.serializer import SubCategorySerializer
from post.models import Post, Comment, SubComment


class PostSimpleSerializer(serializers.ModelSerializer):
    category_url = serializers.CharField(source="board.full_url")
    category_name = serializers.CharField(source="board.full_name")
    
    comment_count = serializers.SerializerMethodField()

    def get_comment_count(self, instance):
        comments = Comment.objects.filter(post=instance)
        subcomments = SubComment.objects.filter(parent__in=comments)
        return comments.count() + subcomments.count()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'writedAt', 'summary', 'image', 'category_url', 'category_name', 'comment_count')


class PostSerializer(serializers.ModelSerializer):
    category_url = serializers.CharField(source="board.full_url")
    category_name = serializers.CharField(source="board.full_name")

    comment_count = serializers.SerializerMethodField()

    def get_comment_count(self, instance):
        comments = Comment.objects.filter(post=instance)
        subcomments = SubComment.objects.filter(parent__in=comments)
        return comments.count() + subcomments.count()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'writedAt', 'summary', 'content', 'image', 'category_url', 'category_name', 'comment_count')


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


class SubCommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubComment
        fields = ('parent', 'writer', 'password', 'email', 'content')


class CommentWithChildSerializer(serializers.ModelSerializer):
    subcomments = serializers.SerializerMethodField()

    def get_subcomments(self, instance):
        my_subcomment = SubComment.objects.filter(parent=instance)
        return SubCommentSerializer(my_subcomment, many=True).data

    class Meta:
        model = Comment
        fields = ('id', 'post', 'writer', 'email', 'content', 'writedAt', 'subcomments')  

