from django.shortcuts import render
from django.views.generic import TemplateView


def home(request):
    return render(request, 'portfolio/index.html')
    
class RenderTemplateView(TemplateView):
    data_map = {
        'fullstack': {
            'side_sections': {
                'frameworks': {
                    'Django': 4,
                    'Bootstrap': 4,
                    'AJAX': 3,
                    'DRF (REST API)': 1,
                    'htmx': 1,
                },
                'libraries': {
                    'jQuery': 3,
                    'React': 1,
                },
                'languages': {
                    'Python': 5,
                    'HTML5/CSS3': 5,
                    'JavaScript': 3,
                    'SQL': 3,
                    'Swift': 1,
                },
                'envs': {
                    'macOS': '',
                    'Windows + WSL': '',
                    'Linux': '',
                    'VS Code': '',
                    'PowerShell': '',
                    'CLI': '',
                    'PostgreSQL': '',
                    'SQL Server': '',
                    'Node.js': '',
                    'Unity': '',
                    'visionOS': '',
                    
                },
            },
        },
        'devops': {
            'side_sections': {
                'tools': {
                    'Azure': 1,
                    'Bicep': 0,
                    'Agile': 4,
                    'Docker': 1,
                    'Git': 4,
                    'Github': 2,
                    'Github Actions': 1,
                    'Jira': 4,
                    'NGINX': 1,
                },
            },
        },
    }

    def get_context_data(self, page, **kwargs):
        context = super().get_context_data(**kwargs)
        self.template_name = f'portfolio/{page}.html'

        # Load data map
        page_data_map = self.data_map.get(page)
        if page_data_map:
            context |= page_data_map
        return context