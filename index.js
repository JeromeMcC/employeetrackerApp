const inquirer = require('inquirer');
require ('console.table');
const connection = require('./connection')
//const constructor = require('./constructor')

//Function inquirer
//const deptArray =[];

// Starting function 
const startingPrompt = () => {
    inquirer
    .prompt([
        {
        // think update role is a bonus option
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View All Employees','Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        },
    ]).then(userChoice => {
        console.log(userChoice)
        switch(userChoice.menu){
            case 'View All Employees':
            viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployees();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;  
            case 'View All Departments':
                viewAllDepts();
                break;      
            case 'Add Department':
                addDepartment();
                break;   
        }
    })
};
startingPrompt();


// Function: VIEW all EMPLOYEES
function viewAllEmployees(){
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS Departments, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(err)
         return;
      }
      console.table(rows)
      startingPrompt()
      });
};

// Function: to ADD an EMPLOYEE
function addEmployees(){
inquirer
.prompt([
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last',
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'job',
        choices: ["Account Manager", 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Sales Lead', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Customer Service']
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'mngr',
        choices: ["None", 'Michael Scott', 'John Snow', 'Taylor Swift', 'Ann Perkins', ]
    },
])
    .then(employeeData =>{
    console.log(employeeData)
    const sql = `INSERT INTO employees (first_name, last_name, salary, role);`;
  const params = [employeeData.first_name, employeeData.last_name, employeeData.salary, employeeData.role];
  connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.log(rows)
    console.log(`Employee ${first_name} ${last_name} added successfully.`)
    startingPrompt()
  });
    })
};

// Function: UPDATE EMPLOYEE
function updateRole(){
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'update',
            choices:['MichaelScott', 'Roland Whitethorn', 'Louis Venuti','John Snow', 'Sansa Stark', 'Jaime Lannister', 'Taylor Swift', 'Pam Beesly', 'Leslie Nope', 'Jan Levins', 'Ann Perkins', 'Cassandra Clare', 'Daenerys Targaryan']
        },
        {
            type: 'list',
            message: "Which role do you want to assign to selected employee?",
            name: 'up_role',
            choices:["Account Manager", 'Accountant','Salesperson', 'Lead Engineer', 'Software Engineer', 'Sales Lead', 'Legal Team Lead', 'Lawyer', 'Customer Service']
        },
    ])
    .then(employeeData =>{
        console.log(employeeData)
    const sql = `UPDATE roles SET role = ? WHERE id = ?`;
    const params = [req.body.role, req.params.id];
  
    connection.query(sql, params, (err, result) => {
      if (err) {
        console.log(err)
        return;
      } else if (!result.affectedRows) {
        console.log("role not found.")
      } else {
        console.log(rows)
        console.log("Employee role updated successfully.")
        startingPrompt()
      }
    });
})
};

// Function: VIEW all ROLES
function viewAllRoles(){
    const sql = `SELECT roles.title AS Roles, roles.id, roles.salary, departments.dept_name AS Departments FROM roles LEFT JOIN departments on roles.department_id = departments.id ORDER BY roles.title;`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(err)
         return;
      }
      console.table(rows)
      startingPrompt()
      });
};

//Function: to ADD a ROLE
function addRole(){
inquirer
.prompt([
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'select-dept',
        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
    },
])
    .then(roleData =>{
        console.log(roleData)
        const sql = `INSERT INTO Roles (dept_name, salary, title)`; 
    const params = [roleData.dept_name, roleData.title, roleData.salary];
    connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.log(rows)
    console.log(`Role ${title} added successfully.`)
    startingPrompt()
    });
    })
}


// Function: to VIEW all the DEPTS
function viewAllDepts(){
    const sql = `SELECT id, dept_name AS Departments FROM departments`;
    connection.query(sql, (err, rows) => {
      if (err) {
       console.log(err)
         return;
      }
      console.table(rows)
      startingPrompt()

      });
}

// Function: to ADD a DEPT
function addDepartment() {
inquirer
.prompt([
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'dept',
    },
])
    .then(departmentData =>{
        console.log(departmentData)
        const sql = `INSERT INTO departments (dept_name)`;
    const params = [departmentData.dept_name];
    connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.log(rows)
    console.log(`Department ${dept_name}added successfully.`)
    startingPrompt()
  });
  })
}