from .settings import *

protocol = 'https://'

DEBUG = False

ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
ALLOWED_HOSTS += [os.environ['CNAME']]
CSRF_TRUSTED_ORIGINS = [protocol + os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
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


# AZURE_ACCOUNT_NAME = os.getenv('AZURE_ACCOUNT_NAME')
# AZURE_ACCOUNT_KEY = os.getenv('AZURE_ACCOUNT_KEY')
# AZURE_CUSTOM_DOMAIN = f'{AZURE_ACCOUNT_NAME}.blob.core.windows.net'
# AZURE_LOCATION = os.environ['AZURE_LOCATION'] if 'AZURE_LOCATION' in os.environ else []
# AZURE_CONTAINER = os.environ['AZURE_CONTAINER'] if 'AZURE_CONTAINER' in os.environ else []

STATICFILES_STORAGE = os.environ['STATICFILES_STORAGE'] if 'STATICFILES_STORAGE' in os.environ else []
# STATIC_LOCATION = 'static'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATIC_HOST = os.environ['STATIC_HOST'] if not DEBUG else ''
STATIC_URL = 'static/'

# DEFAULT_FILE_STORAGE = os.environ['DEFAULT_FILE_STORAGE'] if 'DEFAULT_FILE_STORAGE' in os.environ else []
# MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')
# MEDIA_URL = f'{protocol}{AZURE_CUSTOM_DOMAIN}/media/'