from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from bs4 import BeautifulSoup
from board.models import SubCategory
from PIL import Image
from project.utils import getfilename
import io
import os


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = RichTextUploadingField()
    summery = models.CharField(max_length=200, blank=True)
    image = models.CharField(max_length=200, blank=True)
    writedAt = models.DateField(auto_now_add=True)
    board = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.content, 'html.parser')
        text = soup.text
        imgLink = soup.select_one('img').get('src', '')
        print(imgLink)

        if imgLink == '':
            self.image = '/static/img/no-image.jpg'
        else:
            with open(imgLink[1:], 'rb') as f:
                im = Image.open(io.BytesIO(f.read()))
                im.thumbnail((170, 100))
                link = 'uploads/thumbnail/' + os.path.basename(f.name)
                im.save(link)
                self.image = '/' + link

        self.summery = text[:200]
        super().save(*args, **kwargs)
        

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
