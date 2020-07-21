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
    department_id INT,
	FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);

INSERT INTO department (name)
VALUES ("Engineering"),
	   ("Sales"),
	   ("Accounts"),
	   ("Legal"),
	   ("Finance");
       

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 200000.00, 1),
	   ("Associate Engineer", 125000.00, 1),
	   ("Sales Manager", 95000.00, 2),
	   ("Sales Associate", 45000.00, 2),
	   ("Account Manager", 87000.00, 3),
	   ("Account Representative", 62000.00, 3),
	   ("Lead Counsel", 225000.00, 4),
	   ("General counsel", 150000.00, 4),
	   ("Controller", 110000.00, 5),
       ("Accountant", 85000.00, 5);

   
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eric", "Scott", NULL, NULL);


