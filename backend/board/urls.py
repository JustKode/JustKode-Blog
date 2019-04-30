from django.urls import path
import board.views as views

urlpatterns = [
    path('', views.BoardListView.as_view()),
    path('<str:url>/', views.CategoryView.as_view()),
    path('<str:url>/<int:page>/', views.CategoryView.as_view()),
    path('<str:url>/list/', views.CategoryListView.as_view()),
    path('<str:category_url>/<str:subcategory_url>/', views.SubCategoryView.as_view()),
    path('<str:category_url>/<str:subcategory_url>/<int:page>/', views.SubCategoryView.as_view()),
]
