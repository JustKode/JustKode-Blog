from django.urls import path
import post.views as views

urlpatterns = [
    path('<int:id>', views.PostView.as_view(), name='post_view'),
    path('<int:id>/comments', views.PostCommentView.as_view(), name='post_comment_view'),
    path('comment/<int:id>', views.CommentView.as_view(), name='comment_view'),
    path('subcomment/<int:id>', views.SubCommentView.as_view(), name='subcomment_view')
]
