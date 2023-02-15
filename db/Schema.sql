DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departmentid INT,
    INDEX dep_ind(department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);  

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    roleId INT,
    INDEX role_ind(roleid),
    CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE
    managerId INT,
    INDEX manager_ind(managerId),
    CONSTRAINT fk_manager FOREIGN KEY (managerId) REFERENCES employee(id) ON DELETE SET NULL
);
