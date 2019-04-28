from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from board.models import SubCategory

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = RichTextUploadingField()
    writedAt = models.DateField(auto_now_add=True)
    board = models.ForeignKey(SubCategory, on_delete=models.CASCADE)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    writer = models.CharField(max_length=20)
    email = models.EmailField()
    content = models.TextField()
    writedAt = models.DateTimeField(auto_now_add=True)


class SubComment(models.Model):
    parent = models.ForeignKey(Comment, on_delete=models.CASCADE)
    writer = models.CharField(max_length=20)
    email = models.EmailField()
    content = models.TextField()
    writedAt = models.DateTimeField(auto_now_add=True)
