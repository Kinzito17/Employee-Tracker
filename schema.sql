DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL,
    name - VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL --hold reference to department role belongs to
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, --to hold reference to role employee has
    manager_id INT NOT NULL --to hold reference to another employee thats manager of the current employee. This field may be null if the employee has no manager
);

INSERT INTO department (id, name)
VALUES (1, "Matt");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "FS Developer", 100000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Kinzle," 1, 1);




