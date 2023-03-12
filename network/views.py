from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage

from .models import User, Post, Likes, Follow


def index(request):
    currentUser = request.user
    all_posts = Post.objects.order_by('-timestamp')
    paginator  = Paginator(all_posts, 9)
    
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "network/index.html", {
        "posts" : page_obj,
        "currentUser" : currentUser
    })

@login_required
def following_page(request):
    currentUser = request.user

    # flat=True used when need only one value, e.g. instead of ('list_of_following', 'list_of_users')
    followed_users = Follow.objects.filter(user_follower=currentUser).values_list('user_main', flat=True)

    # NOTE how to filter by the query set values
    post_of_following = Post.objects.filter(user__in=followed_users).order_by('-timestamp')

    paginator  = Paginator(post_of_following, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "network/index.html", {
        "posts" : page_obj
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

    # pagination
    paginator = Paginator(posts, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    if Follow.objects.filter(user_main=user_individual, user_follower=currentUser).exists():
        button = "Unfollow"
    else:
        button = "Follow"

    numberofFollowers = Follow.objects.filter(user_main = user_individual).count()
    numberofFollowing = Follow.objects.filter(user_follower = user_individual).count()

    return render(request, "network/individual.html", {
        "posts" : page_obj,
        "user_individual" : user_individual,
        "currentUser" : currentUser,
        "button" : button,
        "numberofFollowers" : numberofFollowers,
        "numberofFollowing" : numberofFollowing
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
