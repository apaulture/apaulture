from django.shortcuts import render
from django.views.generic import TemplateView
from portfolio.models import Subbranch


def home(request):
    return render(request, 'portfolio/index.html')
    
class RenderTemplateView(TemplateView):
    def get_context_data(self, page, **kwargs):
        context = super().get_context_data(**kwargs)
        self.template_name = f'portfolio/{page}.html'

        subbranches = Subbranch.objects.filter(branch__name=page)
        if subbranches.exists():
            context |= {'subbranches': subbranches}
        return context