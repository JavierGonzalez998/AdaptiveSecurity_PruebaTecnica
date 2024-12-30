CREATE DATABASE Patitas;
CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'databaseUser123';
GRANT ALL PRIVILEGES ON Patitas.* TO 'db_user'@'localhost';
FLUSH PRIVILEGES;

