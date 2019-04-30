from rest_framework import serializers
from board.models import Category, SubCategory
from post.models import Post, Comment, SubComment

class PostSimpleSerializer(serializers.ModelSerializer):
    parent_url = serializers.CharField(read_only=True, source="parent.full_url")
    parent_name = serializers.CharField(read_only=True, source="parent.full_name")
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'summary', 'parent_url', 'parent_name')
