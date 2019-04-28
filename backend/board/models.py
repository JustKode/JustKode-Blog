from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=20)
    url = models.CharField(max_length=20)


class SubCategory(models.Model):
    name = models.CharField(max_length=20)
    url = models.CharField(max_length=20)
    parent = models.ForeignKey(Category, on_delete=models.CASCADE)