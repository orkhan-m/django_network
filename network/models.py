from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post_owner") #, null=True, blank=True)
    post = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} posted: {self.post}"
    
    def serialize(self):
        return {
            "id" : self.id,
            # if self.user does not work try: self.user.username
            "user" : self.user,
            "post" : self.post,
            "timestamp" : self.timestamp.strftime("%d %b %Y, %I:%M %p") 
        }


class Likes(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post_related_likes") #, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_related_likes") #, null=True, blank=True)

    def __str__(self):
        return f"{self.user} liked {self.post}"

    def serialize(self):
        return {
            "id" : self.id,
            # if self.user does not work try: self.user.username
            "user" : self.user,
            "post" : self.post,
        }

class Follow(models.Model):
    user_main = models.ForeignKey(User, on_delete=models.CASCADE, related_name="main") #, null=True, blank=True)
    user_follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follower") #, null=True, blank=True)

    class Meta:
        unique_together = ["user_main", "user_follower"]

    def __str__(self):
        return f"{self.user_follower} is following {self.user_main}"
