from .settings import *

protocol = 'https://'

DEBUG = False

ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
ALLOWED_HOSTS += [os.environ['CNAME']]
CSRF_TRUSTED_ORIGINS = [protocol + os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []

MIDDLEWARE += [
    'whitenoise.middleware.WhiteNoiseMiddleware'
]

conn_str = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
conn_str_params = {pair.split('=')[0]: pair.split('=')[1] for pair in conn_str.split(' ')}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': conn_str_params['dbname'],
        'HOST': conn_str_params['host'],
        'USER': conn_str_params['user'],
        'PASSWORD': conn_str_params['password'],
    }
}


AZURE_ACCOUNT_NAME = os.getenv('AZURE_ACCOUNT_NAME')
AZURE_ACCOUNT_KEY = os.getenv('AZURE_ACCOUNT_KEY')
AZURE_CUSTOM_DOMAIN = f'{AZURE_ACCOUNT_NAME}.file.core.windows.net'

STATICFILES_STORAGE = os.environ['STATICFILES_STORAGE'] if 'STATICFILES_STORAGE' in os.environ else []
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = f'{protocol}{AZURE_CUSTOM_DOMAIN}/static/'

DEFAULT_FILE_STORAGE = os.environ['DEFAULT_FILE_STORAGE'] if 'DEFAULT_FILE_STORAGE' in os.environ else []
MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')
MEDIA_URL = f'{protocol}{AZURE_CUSTOM_DOMAIN}/media/'