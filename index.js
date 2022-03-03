const inquirer = require('inquirer');
const ctable = require ('console.table');
const mysql = require('mysql2');
const connection = require('./connection');


// Starting function 
const startingPrompt = () => {
    inquirer
    .prompt([
        {
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
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name AS Departments, CONCAT (manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.dept_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;`;
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
        name: 'first_name',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last_name',
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'role_id',
        choices: [{name:"Account Manager",value: 1}, {name:'Salesperson',value:7}, {name:'Lead Engineer', value: 8},{name:'Software Engineer', value: 9}, { name:'Sales Manager', value: 6},{ name: 'Accountant', value: 2},{name: 'Legal Team Lead', value: 5},{name: 'Lawyer', value: 4},{ name: 'Customer Service', value: 3}]
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager_id',
        choices: ["None", {name:'Katherine Barry', value: 1}, {name:'John Grisham', value: 2}, {name:'Ibrham Kendi', value: 3},{ name: 'Ellen Ripley', value:4}]
    },
])
    .then(employeeData =>{
    console.log(employeeData)
    const sql = `INSERT INTO employees (first_name, last_name,role_id, manager_id) VALUES(?,?,?,?)`;
  const params = [employeeData.first_name, employeeData.last_name, employeeData.role_id,employeeData.manager_id];
  connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.log(rows)
    console.log(`Employee ${employeeData.first_name} ${employeeData.last_name} added successfully.`)
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
            choices:[{name:'Katherine Barry',value:1},{name:'Cassandra Cain',value:5},{name: 'Lee Child', value:6},{name:'Jon Duckett',value:7},{name: 'John Grisham',vakue:2},{name: 'Ibrham Kendi', value:3},{name: 'Barbara Kingsolver', value:8},{name: 'Martin Lawrence', value:9},{name: 'Douglas Preston', value:10},{name: 'Anna Quindlen', value: 11},{name: 'Jack Reacher', value:12},{ name: 'Ellen Ripley', value:4},{ name: 'Bruce Wayne', value:13}]
        },
        {
            type: 'list',
            message: "Which role do you want to assign to selected employee?",
            name: 'up_role',
            choices:[{name:"Account Manager",value: 1}, {name:'Salesperson',value:7}, {name:'Lead Engineer', value: 8},{name:'Software Engineer', value: 9}, { name:'Sales Manager', value: 6},{ name: 'Accountant', value: 2},{name: 'Legal Team Lead', value: 5},{name: 'Lawyer', value: 4},{ name: 'Customer Service', value: 3}]
        },
    ])
    .then(employeeData =>{
        console.log(employeeData)
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [employeeData.up_role, employeeData.update];
  
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
    const sql = `SELECT roles.title AS Roles, roles.id, roles.salary, departments.dept_name AS Departments FROM roles LEFT JOIN departments on roles.dept_id = departments.id ORDER BY roles.title;`;
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
        name: 'title',
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'dept_id',
        choices: [{name:'Engineering', value: 1},{ name: 'Finance', value:2},{ name: 'Legal', value: 3},{name: 'Sales', value: 4},{name: 'Service', value:5}]
    },
])
    .then(roleData =>{
        console.log(roleData)
        const sql = `INSERT INTO roles ( title, salary,dept_id) VALUES(?,?,?)`; 
    const params = [roleData.title, roleData.salary, roleData.dept_id];
    connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.log(rows)
    console.log(`Role ${roleData.title} added successfully.`)
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
        name: 'dept_name',
    },
])
    .then(departmentData =>{
        console.log(departmentData)
        const sql = `INSERT INTO departments (dept_name) Value(?)`;
    const params = [departmentData.dept_name];
    connection.query(sql, params, (err, rows) => {
     if (err) {
      console.log(err)
      return;
     }
    console.log(rows)
    console.log(`Department ${departmentData.dept_name}added successfully.`)
    startingPrompt()
  });
  })
}