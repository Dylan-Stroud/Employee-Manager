
const inquirer = require("inquirer");

// Connect to database
const db = require("./db/");
require("console.table");

promptUser();


function viewAllDepartments(){
  db.getAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => promptUser());
}
function viewAllRoles(){
  db.getAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => promptUser());
}
function viewAllEmployees(){
  db.getAllEmployees()
        .then(([rows]) => {
            let Employee = rows;
            console.log("\n");
            console.table(Employee);
        })
        .then(() => promptUser());
}

function addEmployee(){
  inquirer.prompt([
    {
      name: "firstname",
      message: "What is the employee's first name?"
    },
    {
      name: "lastname",
      message: "What is the employee's last name?"
    }

  ])
  .then(res => {
    let firstName = res.firstname;
    let lastName = res.lastname;

    db.getAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({id, title}) =>({
          name: title,
          value: id
        }));

        inquirer.prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        })
          .then(res => {
            let roleId = res.roleId;
            db.getAllEmployees()
              .then(([rows]) => {
                let employees = rows;
                console.log(employees);
                const managerChoices = employees.map(({id, firstname, lastname }) =>({
                  name: `${firstname} ${lastname}`,
                  value: id
                }));
                managerChoices.unshift({name: "None",values: null});

                inquirer.prompt({
                  type: "list",
                  name: "managerId",
                  message: "Who is this employee's manager?",
                  choices: managerChoices
                })
                .then(res => {
                  let employee = {
                    managerid: res.managerid,
                    roleId: roleId,
                    firstname: firstName,
                    lastname: lastName
                  }
                  db.createEmployee(employee)
                })
                .then(() => console.log(
                  `added ${firstName} ${lastName} to the database`
                ))
                .then(() => promptUser())
              })
          })
      })
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
      inquirer.prompt([
        //title, id, department, salary
    
        {
          name: "title",
          message: "What is the name for the Role?"
        },
        {
          name: "ID",
          message: "What is the role ID?"
        },
        {
          type: "list",
          name: "departmentid",
          message: "What is the department this role belongs to?",
          choices: departmentChoices
        },
        {
          name: "salary",
          message: "What is the salary of this role?"
        }
      ]).then(role =>{
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => promptUser())
        
      })
    
    })
}

function addDepartment(){
  inquirer.prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    },
    {
      name: "id",
      message: "What is the id for the department?"
    }

  ]).then(department =>{
    db.createDepartment(department)
      .then(() => console.log(`Added ${department.name} to the database`))
      .then(() => promptUser())
  })
}

function updateEmployeeRole(){
  db.getAllEmployees()
    .then(([rows]) =>{
      let employees = rows;
      const employeeChoices = employees.map(({id,firstname,lastname}) =>({
        name: `${firstname} ${lastname}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "employeeid",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.getAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title}) =>({
                name: title,
                value: id
              }));

              prompt({
                type: "list",
                name: "roleid",
                message: "Which role would you like to give the emloyee?",
                choices: roleChoices
              })
            })
              .then(res => db.updateEmployeeRole(employeeId, res.roleId))
              .then(() => console.log("Updated employee's role"))
              .then(() => promptUser())
        })

    })
  
}
function updateEmployeeManager(){
  db.getAllEmployees()
    .then(([rows]) =>{
      let employees = rows;
      const employeeChoices = employees.map(({id,firstname,lastname}) =>({
        name: `${firstname} ${lastname}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "employeeid",
          message: "Which employee's manager do you want to update?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.getAllEmployees()
            .then(([rows]) => {
              let managers = rows;
              const managerChoices = managers.map(({ id, firstname, lastname}) =>({
                name: `${firstname} ${lastname}`,
                value: id
              }));

              prompt({
                type: "list",
                name: "mangerid",
                message: "Which manager would you like to give the emloyee?",
                choices: managerChoices
              })
            })
              .then(res => db.updateEmployeeManager(employeeId, res.managerid))
              .then(() => console.log("Updated employee's manager"))
              .then(() => promptUser())
        })

    })
}

function removeEmployee(){
  db.getAllEmployees()
    .then(([rows]) =>{
      let employees = rows;
      const employeeChoices = employees.map(({id,firstname,lastname}) =>({
        name: `${firstname} ${lastname}`,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "employeeid",
          message: "Which employee do you want to remove?",
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeid))
        .then(() => promptUser())

    })
}
function removeRole(){
  db.getAllRoles()
    .then(([rows]) =>{
      let roles = rows;
      const roleChoices = roles.map(({id, title}) =>({
        name: title,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "roleid",
          message: "Which role do you want to remove?",
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleid))
        .then(() => promptUser())

    })
}
function removeDepartment(){
  db.getAllDepartments()
    .then(([rows]) =>{
      let departments = rows;
      const departmentChoices = departments.map(({id, name}) =>({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "departmentid",
          message: "Which department do you want to remove?",
          choices: departmentChoices
        }
      ])
        .then(res => db.removeDepartment(res.departmentid))
        .then(() => promptUser())

    })
}

function viewTotalUtilizedDeptBudget(){
  db.getAllDepartments()
  .then(([rows]) =>{
    let departments = rows;
    const departmentChoices = departments.map(({id, name})=>({
      name: name,
      value: id
    }));

    inquirer.prompt([
      {
        type: "list",
        name: "departmentid",
        message: "Which department's total utilized budget do you want?",
        choices: departmentChoices
      }
    ])
      .then((res) => {
        db.getSalariesInDept(res.departmentid)
          .then(([rows]) =>{
            employees = rows;
            console.log("\n");
            console.table(employees);
            console.log(`Found budget in department ${res.departmentid}`)
          })
          .then(() => promptUser())
      })
      

  

  })
}

function viewEmployeesByDepartment(){
  db.getAllDepartments()
    .then(([rows]) =>{
      let departments = rows;
      const departmentChoices = departments.map(({id, name})=>({
        name: name,
        value: id
      }));

      inquirer.prompt([
        {
          type: "list",
          name: "departmentid",
          message: "Which department's employees do you want to view?",
          choices: departmentChoices
        }
      ])
        .then((res) => {
          db.getEmployeesByDept(res.departmentid)
            .then(([rows]) =>{
              employees = rows;
              console.log("\n");
              console.log(employees);
              console.log(`Found employees by Department ${res.departmentid}`)
            })
            .then(() => promptUser())
        })
        

    

    })
}
function viewEmployeesByManager(){
  db.getAllManagers()
    .then(([rows]) =>{
      let managers = rows;
      const managerChoices = managers.map(({id, firstname, lastname}) => ({
        name: `${firstname} ${lastname}`,
        value: id
      }));
      inquirer.prompt([
        {
          type: "list",
          name: "managerid",
          message: "Which manager's employees do you want to view?",
          choices: managerChoices
        }
      ])
        .then((res) => {
          db.getEmployeesByMang(res.managerid)
          .then(([rows]) =>{
            employees = rows;
            console.log("\n");
            console.table(employees);
            console.log(`Found employees for manager ${res.managerid}`)
          })
          .then(() => promptUser())
        })

    })

}

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
      quit();
    }
  })
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}


/*

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
