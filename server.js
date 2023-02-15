
const inquirer = require("inquirer");

// Connect to database
const db = require("./db/");
require("console.table");

promptUser();

function getEmployeeNames(){
  const sql = `
    SELECT CONCAT(employee.first_name, " ", employee.last_name) AS NAME
    FROM employee
  `;
  return db.promise.query(sql)
  
}
function getEmployeeByName(name){
  const sql = `
    SELECT employee.id, concat(employee.first_name, " ", employee.last_name) AS name
    FROM employee
    WHERE CONCAT(employee.first_name, " ", employee.last_name) = ?  
  `;
  return db.promise().query(sql, name)

}
function getDepartmentByName(department){
  const sql = `
    SELECT department.id
    FROM department
    WHERE department.name = ?
  `;
  return db.promise().query(sql, department)
  
}
function GetDepartmentNames(){
  const sql = `
    SELECT department.name
    FROM department
  `;
  return db.promise().query(sql)
  
}
function getRoles(){
  const sql = `
  SELECT roles.name
  FROM roles
  `;
  return db.promise().query(sql)
  
}
function addDepartment(){
  prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }

  ]).then(res =>{
    let name = res;
    const sql =`
      INSERT INTO res SET ?
    `;
    db.promise().query(sql, res)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => promptUser())
  })

  
}
function addRole(role){
  db.getAllDepartments()
    .then(([rows]) =>{
      let departments = rows;
      const departmentChoices = departments.map(({id, name}) =>( {
        name: name,
        value: id
      }));
      promptUser([
        //title, id, department, salary
    
        {
          title: "title",
          message: "What is the name for the Role?"
        },
        {
          title: "ID",
          message: "What is the role ID?"
        },
        {
          type: "list",
          name: "department_id",
          message: "What is the department this role belongs to?",
          choices: departmentChoices
        },
        {
          title: "salary",
          message: "What is the salary of this role?"
        }
      ]).then(res =>{
        
      })
    
    });
  
  const sql = `
  INSERT INTO role SET ?
  `;
  return db.promis().query(sql, role)
}
function addEmployee(employee){
  promptUser([
    //firstname, lastname, role, manager
  ])
  
}
function updateEmployeeRole(){
  promptUser([
    //select employee to update and their new role and then updated to database
  ])
  
}
function updateEmployeeManager(){
  
}
function viewEmployeesByDepartment(){
  
}
function viewEmployeesByManager(){
  
}
function removeEmployee(){
  
}
function removeDepartment(){
  
}
function removeRole(){
  
}
function viewTotalUtilizedDeptBudget(){
  
}


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function promptUser
(){
  return inquirer.prompt([
    {
      type: "list",
      name: "pickOption",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        "View Total Utilized Budget of a Department",
        "Quit"
      ] 
    }
  ])
  .then(userChoice => {
    let answer = userChoice.pickOption;
    if (answer === "View All Departments") {
      viewAllDepartments();
    }
    
    if (answer === "View All Roles") {
      viewAllRoles();
    }

    if (answer === "View All Employees") {
      viewAllEmployees();
    }
    
    if (answer === "Add Department") {
      addDepartment();
    }

    if (answer === "Add Role") {
      addRole();
    }

    if (answer === "Add Employee") {
      addEmployee();
    }

    if (answer === "Update Employee Role") {
      updateEmployeeRole();
    }

    if (answer === "Update Employee Manager") {
      updateEmployeeManager();
    }

    if (answer === "View All Employees by Department") {
      viewEmployeesByDepartment();
    }

    if (answer === "View All Employees by Manager") {
      viewEmployeesByManager();
    }

    if (answer === "Remove Employee") {
      removeEmployee();
    }

    if (answer === "Remove Department") {
      removeDepartment();
    }

    if (answer === "Remove Role") {
      removeRole();
    }

    if (answer === "View Total Utilized Budget of a Department") {
      viewTotalUtilizedDeptBudget();
    }

    if (answer === "Quit") {
      db.end();
    }
  })
}
