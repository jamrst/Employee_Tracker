DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name varchar(30)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title varchar(30),
  salary DECIMAL,
  department INTEGER,
  FOREIGN KEY (department)
  REFERENCES departments(id)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name varchar(30),
  last_name  varchar(30),
  role_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES roles(id),
  manager_id INTEGER,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
);