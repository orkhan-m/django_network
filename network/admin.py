from django.contrib import admin

# Register your models here.
from .models import User, Likes, Post, Follow

admin.site.register(User)
admin.site.register(Likes)
admin.site.register(Post)
admin.site.register(Follow)