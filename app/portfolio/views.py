import random
from django.shortcuts import render

def home(request):
    context = dict()
    return render(request, 'portfolio/index.html', context)