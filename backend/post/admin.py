from django.contrib import admin
from post.models import Post, Comment, SubComment

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(SubComment)