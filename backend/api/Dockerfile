FROM php:8.2-apache
# Enable mysqli and PDO MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql
# Copy all backend files
COPY . /var/www/html/
# Enable Apache mod_rewrite for clean URLs
RUN a2enmod rewrite
EXPOSE 80