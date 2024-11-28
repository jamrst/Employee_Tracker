import inquirer from "inquirer";
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

let tablesQuery : string = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(employees.first_name, ' ', employees.last_name) AS manager
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department = departments.id
LEFT JOIN employees manager ON employees.manager_id = employees.id
;
`;
await connectToDb();

choose();

function choose(): void {
inquirer
.prompt([
  {
    type: 'list',
    name: 'AddOrSelect',
    //Shows the actions that can be chosen
    message:'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'
    ]
  },
  ])
  .then((answers) => {
    //Sees the option selected and calls the appropiate function
    switch(answers.AddOrSelect) {
      case 'View All Employees':
              viewAllEmployees();
              break;
      case 'Add Employee':
              addEmployee();
              break;
      case 'Update Employee Role':
              updateRole();
              break;
      case 'View All Roles':
              viewRoles();
              break;
      case 'Add Role':
              addRole();
              break;
      case 'View All Departments':
              viewDepartments();
              break;
      case 'Add Department':
              addDepartment();
              break;
      default:
              console.log('Closing Connection');
              process.exit(1);
              break;
            }

    });
  }


    //Function to view all the employees showing the role, dept, and salary.
  function viewAllEmployees(): void {
      // uses the query stored in tablesQuery to get all the necessary tables.
    pool.query( tablesQuery, (err: Error, result: QueryResult) => {
        if (err){
          console.log(err); 
        } else {

          //adds space for format purposes.
          console.log(
            `
            
            
            
            `
          );
          //prints the result of the query in table format.
          console.table(result.rows);
          
          console.log(
            `
            
            
            
            `
          );
          choose();
        }
      }
    ); 
  } 
  
  //Function to add employees.

  function addEmployee(): void{

    let newEmpRole;
    let newEmpManager;

    //Uses the same query from the viewAllEmployees() function.
    pool.query( tablesQuery, (err: Error, result: QueryResult) => {
        if (err) {
        console.log(err);
      } else {
        //saves the vaules of the roles table in a variable to be used later as choices 
        newEmpRole = result.rows.map(roles => ({
          name: roles.title,
          value: roles.id
        }));
        
        //saves the vaules of the employees table in a variable to be used later as choices 
        newEmpManager = result.rows.map(employees => ({
          name: `${employees.first_name} ${employees.last_name}`,
          value: employees.id
        }));
        inquirer.prompt([
        {
          //prompts for the employee's name
          type: 'input',
          message: 'Please add the first name of the new Employee',
          name: 'newEmpFirst'
        },
        {
          //prompts for the employee's last name
          type: 'input',
          message: 'Please add the last name of the new Employee',
          name: 'newEmpLast'
        },
        {
          //uses the varialbe newEmpRole to show the roles available
          type: 'list',
          message: 'Please choose the role of the new Employee',
          name: 'empRole',
          choices: newEmpRole
        },
        {
          //uses the varialbe newEmpManager to show the Managers available
          type: 'list',
          message: 'Please choose the manager of the new Employee',
          name: 'empMan',
          choices: newEmpManager
        },])
        .then((response) => {
          //creates a query to add the new employee from the values gather from the prompt
          pool.query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES  ('${response.newEmpFirst}', '${response.newEmpLast}', ${parseInt(response.empRole)}, ${parseInt(response.empMan)});`,
              (err: Error, result: QueryResult) => {
                if (err){
                  //if the query is not valid it will throw an error
                  console.log('query error');
                  console.log(err); 
              } else {
                console.log(
                  `
                  
                  `
                );
                //shows the amout of rows that were added.
                console.table(`${result.rowCount} employee has been added!`);
                console.log(
                  `
                  
                  `
                );
                choose();
              }
            }
          );})

        }
      } );
      }


  function updateRole(): void{

    let editEmp;
    let rolelist;

    //Uses the same query from the viewAllEmployees() function.
    pool.query( tablesQuery, (err: Error, result: QueryResult) => {
        if (err) {
        console.log(err);
      } else {
        //saves the vaules of the roles table in a variable to be used later as choices 
        rolelist = result.rows.map(roles => ({
          name: roles.title,
          value: roles.id
        }));
        //saves the name and id of the employees table in a variable to be used later as options 
        editEmp = result.rows.map(employees => ({
          name: `${employees.first_name} ${employees.last_name}`,
          value: employees.id
        }));
        inquirer.prompt([
        {
          //shows the names and last names of the employees available to be modified
          type: 'list',
          message: 'Which employee do you want to update? ',
          name: 'empToEdit',
          choices: editEmp
        },
        {
          //shows the list of roles available to be modified
          type: 'list',
          message: 'Please choose the new role of the Employee',
          name: 'empRole',
          choices: rolelist
        },])

        .then((response) => {
          //creates a query to update the role of the employee from the values gather from the prompt
          pool.query(
              `UPDATE employees
              SET role_id = ${response.empRole}
              WHERE id = ${response.empToEdit}
              ;`,
              (err: Error, result: QueryResult) => {
                if (err){
                  //if the query is not valid it will throw an error
                  console.log('query error');
                  console.log(err); 
              } else {
                console.log(
                  `
                  
                  `
                );
                //shows the amout of rows that were updated.
                console.table(`${result.rowCount} employee role has been Updated`);
                console.log(
                  `
                  
                  `
                );
                choose();
              }
            }
          );})

        }
      } );


  }


  function viewRoles(): void{
//shows the roles available with their respective department
    pool.query(
      `SELECT roles.id, roles.title, departments.department_name, roles.salary
      FROM roles
      JOIN departments ON roles.department = departments.id
      ;`
      , (err: Error, result: QueryResult) => {
        if (err){
          console.log(err); 
        } else {
          console.log(
            `
            
            
            
            `
          );
          console.table(result.rows);
          console.log(
            `
            
            
            
            `
          );
          choose();
        }
      }
    );
    
  }
  
  function addRole(): void{
    let departmentList;
    
    pool.query(`SELECT * FROM departments`, (err: Error, result: QueryResult) => {
      if (err) {
        console.log(err);
      } else {
        departmentList = result.rows.map(departments => ({
          name: departments.department_name,
          value: departments.id
        }));
        inquirer.prompt([
          {
            //prompts for the title of the new Role
            type: 'input',
            name: 'newRole',
            message:'Which is the name of the new role?',
          },
          {
            //prompts for the salary of the new Role
            type: 'input',
            name: 'newSalary',
            message:'What is the salary of this new role?',
          },
          {
            //shows the list of departments available
            type: 'list',
            name: 'SelectDept',
            message:'Please Select the Department',
            choices: departmentList
          }])
        .then((response) => {
          pool.query(
          //creates a query to add the new role from the values gather from the prompt

            `INSERT INTO roles (title, salary, department)
            VALUES  ('${response.newRole}', ${parseInt(response.newSalary)}, ${parseInt(response.SelectDept)});`,
            (err: Error, result: QueryResult) => {
              if (err){
                console.log('query error');
                console.log(err); 
              } else {
                console.log(
                  `
                  
                  `
                );
                console.table(`${result.rowCount} role has been added!`);
                console.log(
                  `
                  
                  `
                );
                choose();
              }
            }
        );}
      )

    }
  }

    );

    }

  function viewDepartments(): void{

    //creates a query to see all of the available departments
    pool.query(
      `SELECT * FROM departments;`
      , (err: Error, result: QueryResult) => {
        if (err){
          console.log(err); 
        } else {
          console.log(
            `
            
            
            
            `
          );
          console.table(result.rows);
          console.log(
            `
            
            
            
            `
          );
          choose();
        }
      }
    );
    
  }
  
  function addDepartment(): void{

        inquirer.prompt([
          {
          //prompts for the name of the new department
            type: 'input',
            name: 'newDepartment',
            message:'What is the name of the new department?',
          }])
        .then((response) => {
          pool.query(
            //creates a query to add the new department from the values gather from the prompt

            `INSERT INTO departments (department_name)
            VALUES  ('${response.newDepartment}');`,
            (err: Error, result: QueryResult) => {
              if (err){
                console.log('query error');
                console.log(err); 
              } else {
                console.log(
                  `
                  
                  `
                );
                console.table(`${result.rowCount} department has been added!`);
                console.log(
                  `
                  
                  `
                );
                choose();
              }
            }
        );
      });

    }


