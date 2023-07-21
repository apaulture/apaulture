import random
from django.shortcuts import render

PRINCIPLES = {
    1: 'Good design is innovative',
    2: 'Good design makes a product useful',
    3: 'Good design is aesthetic',
    4: 'Good design makes a product understandable',
    5: 'Good design is unobtrusive',
    6: 'Good design is honest',
    7: 'Good design is long-lasting',
    8: 'Good design is thorough down to the last detail',
    9: 'Good design is environmentally-friendly',
    10: 'Good design is as little design as possible'
}

def home(request):
    principle = PRINCIPLES.get(random.randint(1, 10))
    context = dict(principle=principle)
    return render(request, 'portfolio/index.html', context)