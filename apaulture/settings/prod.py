from .base import *

protocol = 'https://'

DEBUG = False

ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else [os.getenv('HOST')]
ALLOWED_HOSTS += [os.getenv('CNAME')]
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

AZURE_CONNECTIONSTRING = os.environ.get('AZURE_POSTGRESQL_CONNECTIONSTRING')
if AZURE_CONNECTIONSTRING:
    postgres_connection_string = {pair.split('=')[0]: pair.split('=')[1] for pair in AZURE_CONNECTIONSTRING.split(' ')}
else:
    postgres_connection_string = dict(os.environ)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': postgres_connection_string['POSTGRES_DB'],
        'HOST': postgres_connection_string['HOST'],
        'USER': postgres_connection_string['POSTGRES_USER'],
        'PASSWORD': postgres_connection_string['POSTGRES_PASSWORD'],
    }
}


STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}