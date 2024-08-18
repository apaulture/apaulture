from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path(
        'ajax/<str:page>/',
        views.RenderTemplateView.as_view(),
        name='render-template'
    )
]