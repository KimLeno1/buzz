# Deployment Guide: PHP Backend & SQL Database

This guide outlines the step-by-step process for deploying a PHP-based backend and a SQL (MySQL/PostgreSQL) database to work with your frontend application.

## 1. Database Setup (SQL)

### Local Preparation
1. **Export Schema**: Export your local database structure and data to a `.sql` file.
   ```bash
   mysqldump -u username -p database_name > backup.sql
   ```

### Server Deployment
1. **Choose a Provider**: Use a managed service (AWS RDS, DigitalOcean Managed DB) or install SQL on a VPS.
2. **Create Database**: Log into your SQL server and create a new database.
   ```sql
   CREATE DATABASE buy_buzz_db;
   ```
3. **Import Data**: Upload your `.sql` file to the server and import it.
   ```bash
   mysql -u username -p buy_buzz_db < backup.sql
   ```
4. **Create User**: Create a dedicated user with restricted permissions for the PHP app.
   ```sql
   CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON buy_buzz_db.* TO 'app_user'@'localhost';
   ```

## 2. PHP Backend Deployment

### Server Environment
1. **Install PHP**: Ensure PHP (8.1+) and necessary extensions (`php-mysql`, `php-json`, `php-mbstring`) are installed.
2. **Web Server**: Configure Nginx or Apache to serve your PHP files.
   - **Nginx Example**:
     ```nginx
     location ~ \.php$ {
         include snippets/fastcgi-php.conf;
         fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
     }
     ```

### Application Code
1. **Upload Files**: Transfer your PHP files to the server (e.g., `/var/www/html/api`).
2. **Environment Variables**: Create a `.env` file or use server environment variables for database credentials.
   ```php
   // config.php
   $host = getenv('DB_HOST');
   $db   = getenv('DB_NAME');
   $user = getenv('DB_USER');
   $pass = getenv('DB_PASS');
   ```
3. **CORS Configuration**: Ensure your PHP headers allow requests from your frontend domain.
   ```php
   header("Access-Control-Allow-Origin: https://your-frontend-app.run.app");
   header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type, Authorization");
   ```

## 3. Preparing the Web App (Frontend)

To connect your React frontend to the new PHP backend:

1. **Update API URL**: Change your API base URL in the frontend code to point to your production PHP endpoint.
   - Use an environment variable: `VITE_API_URL=https://api.yourdomain.com`
2. **Build for Production**:
   ```bash
   npm run build
   ```
3. **Deploy Static Files**: Upload the contents of the `dist/` folder to your static hosting provider (Vercel, Netlify, or an Nginx static folder).

## 4. Security Checklist
- [ ] Enable HTTPS (SSL/TLS) using Let's Encrypt.
- [ ] Disable PHP error reporting in production (`display_errors = Off`).
- [ ] Use Prepared Statements in SQL to prevent SQL Injection.
- [ ] Set up a Firewall (UFW) to only allow traffic on ports 80 and 443.
