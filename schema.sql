DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT 
);

INSERT INTO department (name)
VALUES ("Engineering"),
	   ("Sales"),
	   ("Accounts"),
	   ("Legal"),
	   ("Finance");
       

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 200000.00, NULL),
   
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eric", "Scott", NULL, NULL);
      


SELECT * FROM employee;


