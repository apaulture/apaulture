from portfolio.models import Branch, Subbranch, Skill


def run():
    data_map = {
        'fullstack': {
            'frameworks': {
                'Django': 4,
                'Bootstrap': 4,
                'AJAX': 3,
                'REST API': 1,
                'htmx': 1,
            },
            'libraries': {
                'jQuery': 3,
                'React': 1,
            },
            'languages': {
                'Python': 5,
                'HTML5': 5,
                'CSS3': 5, 
                'JavaScript': 3,
                'SQL': 3,
                'C#': 1,
                'Swift': 1,
            },
            'envs': {
                'macOS': '',
                'Windows': '',
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
        'devops': {
            'skills': {
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
    }

    for branch, subbranches in data_map.items():
        branch, created = Branch.objects.get_or_create(name=branch)
        for subbranch, skills in subbranches.items():
            subbranch, created = Subbranch.objects.get_or_create(branch=branch, name=subbranch)
            for skill, year in skills.items():
                skill, created = Skill.objects.get_or_create(
                    subbranch=subbranch,
                    name=skill,
                )
                if year:
                    skill.days = year * 365
                    skill.save()