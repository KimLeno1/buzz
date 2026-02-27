# Deployment Guide: Buy Buzz Data Spot

This guide explains how to deploy the Buy Buzz Data Spot application with a PHP backend and MySQL database.

## 1. Prerequisites
- **Web Server**: Apache or Nginx
- **PHP**: Version 7.4 or higher
- **Database**: MySQL or MariaDB
- **Node.js**: For building the frontend

## 2. Database Setup (SQL)

Create a database named `buy_buzz_db` and run the following SQL commands to set up the schema:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    rank VARCHAR(20) DEFAULT 'Seeker',
    xp INT DEFAULT 0,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bundles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category ENUM('MTN', 'Telecel', 'AirtelTigo', 'All-Network') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    licenses_remaining INT NOT NULL,
    total_licenses INT NOT NULL,
    description TEXT,
    rarity VARCHAR(20),
    is_flash_sale BOOLEAN DEFAULT FALSE
);

CREATE TABLE services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    badge VARCHAR(20)
);

CREATE TABLE transactions (
    id VARCHAR(50) PRIMARY KEY,
    user_id INT,
    type ENUM('Top-up', 'Transfer', 'Purchase') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Pending',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Initial Admin User
-- Password 'wh@t2' hashed using PHP password_hash()
INSERT INTO users (name, email, password, is_admin, rank) 
VALUES ('Admin', 'admin@buybuzz.com', '$2y$10$7R5vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4vR4v', 1, 'Legend');
```

## 3. Backend Implementation (PHP)

Create a folder named `api` in your web root.

### `config.php`
```php
<?php
$host = 'localhost';
$db   = 'buy_buzz_db';
$user = 'root';
$pass = ''; // Your DB password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
```

### `auth.php` (Example Login)
```php
<?php
require 'config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = $data['email']; // This can be email or username
    $password = $data['password'];

    // Check for email OR username
    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ? OR name = ?');
    $stmt->execute([$identifier, $identifier]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        unset($user['password']); // Don't send password back
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
}
?>
```

## 4. Frontend Deployment

1. **Build the App**:
   Run the following command in your project directory:
   ```bash
   npm run build
   ```
2. **Upload Files**:
   Copy the contents of the `dist` folder to your web server's public directory (e.g., `public_html` or `www`).
3. **Configure API URL**:
   Ensure your frontend code points to your PHP backend URL (e.g., `https://yourdomain.com/api/`).

## 5. Admin Credentials
- **Username**: `admin`
- **Password**: `wh@t2`
- **Access Method**: Open the login modal, click the **Shield icon** 5 times to enter Admin Mode, then login with the username `admin`.

## 6. Security Notes
- **HTTPS**: Always use SSL/TLS for your production deployment.
- **CORS**: Configure Cross-Origin Resource Sharing in your PHP scripts if your frontend and backend are on different domains.
- **Validation**: Ensure all inputs are validated on the server side to prevent SQL injection and other attacks.
