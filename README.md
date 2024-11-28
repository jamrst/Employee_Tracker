# Employee-Tracker

## Description

**Employee-Tracker** is a command-line application that helps organizations manage their workforce efficiently. This application allows users to view and manage information about departments, roles, and employees in a company. It provides a user-friendly interface to perform essential tasks such as viewing records, adding new entries, and updating existing data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jamrst/Employee_Tracker.git

2. Navigate to the project directory:
    ```bash
    cd Employee-Tracker

3. Install dependencies:
    ```bash
    npm install

4. Set up the database:
- Create a MySQL database using the schema provided in the project files.
- Update the database connection settings in the .env file.

## Usage

1. To start the application, run the following command:
    ```bash
    node index.js

## Application Options

Upon starting the application, you will be presented with the following menu options:

- View All Departments: Displays a table with department names and IDs.
- View All Roles: Displays a table with job titles, role IDs, department names, and salaries.
- View All Employees: Displays a table with employee details, including IDs, names, job titles, departments, salaries, and their managers.
- Add a Department: Prompts you to input a department name and adds it to the database.
- Add a Role: Prompts you to input the role's name, salary, and associated department, then adds the role to the database.
- Add an Employee: Prompts you to input the employee’s first and last name, role, and manager, then adds the employee to the database.
- Update an Employee Role: Prompts you to select an employee and their new role, then updates the database with this information.

## Features

- Interactive command-line interface for easy navigation and data management.
- Dynamic display of data in formatted tables for better readability.
- Supports CRUD (Create, Read, Update, Delete) operations for managing company data.

## Acceptance Criteria

- View all departments.
- View all roles.
- View all employees.
- Add a department.
- Add a role.
- Add an employee.
- Update an employee role.

## Link to demo

https://drive.google.com/file/d/1H4HPtGM7olsPCSUDbb62cCBbm-GtuPWF/view

## License
This project is licensed under the ISC License.

## Questions
If you have any questions about this project, please reach out via GitHub or email:

GitHub: Your GitHub jamrst
Email: jamrst95@gmail.com