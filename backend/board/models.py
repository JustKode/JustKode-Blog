from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=20, unique=True)
    url = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=20)
    url = models.CharField(max_length=20)
    parent = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategorys')

    def __str__(self):
        return self.parent.name + '/' + self.name

    def full_name(self):
        return self.parent.name + '/' + self.name

    def full_url(self):
        return self.parent.url + '/' + self.url

    class Meta:
        unique_together = [('url', 'parent'), ('name', 'parent')]