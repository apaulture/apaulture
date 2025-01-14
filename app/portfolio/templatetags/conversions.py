import math
from django import template


register = template.Library()

@register.filter
def year(days):
    return math.floor(days / 365)