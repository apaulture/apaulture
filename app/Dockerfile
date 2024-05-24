FROM python:3.11
ENV PYTHONBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ARG SECRET_KEY
ARG MANAGE_ENV
EXPOSE 8000/tcp

WORKDIR /app
COPY requirements /app/requirements/
RUN pip install -r requirements/prod.txt
COPY . /app

RUN python manage.py collectstatic --no-input
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]