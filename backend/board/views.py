from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from board.models import Category, SubCategory
from post.models import Post, Comment, SubComment


