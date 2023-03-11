from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import User, Post, Likes, Follow


def index(request):
    return render(request, "network/index.html", {
        "posts" : Post.objects.order_by('-timestamp')
    })

@login_required
def follow(request, id):
    if request.method != "POST":
        return HttpResponseRedirect(reverse("individual", args=[id]))
    
    currentUser = request.user
    user_individual = User.objects.get(pk=id)

    print(currentUser)
    print(user_individual)

    if Follow.objects.filter(user_main=user_individual, user_follower=currentUser).exists():
        to_delete_follow = Follow.objects.get(user_follower=currentUser, user_main=user_individual)
        to_delete_follow.delete()
    elif not Follow.objects.filter(user_main=user_individual, user_follower=currentUser).exists():
        newFollow = Follow(
            user_main = user_individual,
            user_follower = currentUser
        )

        newFollow.save()

    return HttpResponseRedirect(reverse("individual", args=[id]))

def individual(request, id):
    # get the user - owner of the profile
    user_individual = User.objects.get(pk=id)

    # get logged in user
    currentUser = request.user

    # posts of the selected id profile
    posts = Post.objects.filter(user=user_individual).order_by('-timestamp')

    if Follow.objects.filter(user_main=user_individual, user_follower=currentUser).exists():
        button = "Unfollow"
    else:
        button = "Follow"

    return render(request, "network/individual.html", {
        "posts" : posts,
        "user_individual" : user_individual,
        "currentUser" : currentUser,
        "button" : button
    })
    
"""Function to POST the 
content to the feed"""
@login_required
def post(request):
    if request.method == "POST":
        content = request.POST["input-textarea-name"]
        # do not publish if completely blank
        if content.strip() == "":
            return HttpResponseRedirect(reverse("index"))
        
        currentUser = request.user

        new_post = Post(
            user = currentUser,
            post = content
        )

        new_post.save()
    
        return HttpResponseRedirect(reverse("index"))

    else:
        return HttpResponseRedirect(reverse("index"))

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # get all posts
        posts = Post.objects.order_by('-timestamp')

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
