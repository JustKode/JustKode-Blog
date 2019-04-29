from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
from bs4 import BeautifulSoup
from board.models import SubCategory
from project.settings import BASE_DIR
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
    board = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='posts')

    def save(self, *args, **kwargs):
        soup = BeautifulSoup(self.content, 'html.parser')
        text = soup.text
        imgLink = soup.select_one('img').get('src', '')
        print(imgLink)


        if imgLink == '':
            self.image = '/static/img/no-image.jpg'
        else:
            with open(BASE_DIR + imgLink, 'rb') as f:
                im = Image.open(io.BytesIO(f.read()))
                size = im.size
                if size[0] > size[1] * 1.7:
                    top = 0
                    bottom = size[1]
                    left = size[0] / 2 - size[1] * 0.85
                    right = size[0] / 2 + size[1] * 0.85
                else:
                    top = size[1] / 2 - size[0] * (1 / 1.7) * 0.5
                    bottom = size[1] / 2 + size[0] * (1 / 1.7) * 0.5
                    left = 0
                    right = size[0]
                croped = im.crop((left, top, right, bottom))
                croped.thumbnail((170, 100))
                link = 'uploads/thumbnail/' + os.path.basename(f.name)
                croped.convert('RGB').save(link, "JPEG", quality=200)
                self.image = '/' + link

        self.summery = text[:200]
        super().save(*args, **kwargs)

    
    def __str__(self):
        return "[{}] {}".format(self.board, self.title)
        

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    writer = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    content = models.TextField()
    writedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.writer + ": " + self.content


class SubComment(models.Model):
    parent = models.ForeignKey(Comment, on_delete=models.CASCADE)
    writer = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    content = models.TextField()
    writedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.writer + ": " + self.content
