from django.urls import path
import post.views as views

urlpatterns = [
    path('<int:id>', views.PostView.as_view(), name='post_view'),
    path('<int:id>/comment', views.CommentView.as_view(), name='comment_view')
]
