FROM php:8.2-apache

# Install mysqli + required dependencies
RUN docker-php-ext-install mysqli

WORKDIR /var/www/html

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80