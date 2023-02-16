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
    INDEX dep_ind(departmentid),
    CONSTRAINT fk_department FOREIGN KEY (departmentid) REFERENCES department(id) ON DELETE CASCADE
);  

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    roleid INT,
    INDEX role_ind(roleid),
    CONSTRAINT fk_role FOREIGN KEY (roleid) REFERENCES role(Id) ON DELETE CASCADE,
    managerid INT,
    INDEX manager_ind(managerid),
    CONSTRAINT fk_manager FOREIGN KEY (managerid) REFERENCES employee(id) ON DELETE SET NULL
);
