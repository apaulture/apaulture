FROM nginx:latest

WORKDIR /etc/nginx
COPY nginx.conf nginx.conf
RUN mkdir sites-available sites-enabled
COPY apaulture /etc/nginx/sites-available/apaulture
RUN ln -s /etc/nginx/sites-available/apaulture /etc/nginx/sites-enabled/

CMD ["nginx", "-g", "daemon off;"]