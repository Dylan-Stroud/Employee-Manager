const connection = require("./connection");
class db{
    constructor(connection){
        this.connection = connection;
    }
    getAllEmployees(){
        const sql = `
            SELECT employee.id, 
                employee.firstname, 
                employee.lastname, 
                role.title, 
                department.name AS department, 
                role.salary, 
                CONCAT(manager.firstname, ' ', manager.lastname) AS manager FROM employee 
                LEFT JOIN role ON employee.roleid = role.id 
                LEFT JOIN department ON role.departmentid = department.id 
                LEFT JOIN employee manager ON manager.id = employee.managerid
            `;
            return this.connection.promise().query(sql)
    }
    getAllManagers(){
        const sql = `
            SELECT employee.id, 
                employee.firstname, 
                employee.lastname, 
                employee.managerid
            FROM employee
            WHERE employee.managerid IS NULL
            `;
            return this.connection.promise().query(sql)
    }
    getAllRoles(){
        const sql = `
          SELECT role.id, 
            role.title, 
            department.name AS department, 
            role.salary FROM role 
            LEFT JOIN department on role.departmentid = department.id
            `;
        return this.connection.promise().query(sql);
      
      }
    getAllDepartments(){
        const sql = `
          SELECT department.id, department.name
          FROM department
        `;
        return this.connection.promise().query(sql);
      
    }
    
    createRole(role){
        const sql = `
            INSERT INTO role SET ?
        `;
        return this.connection.promise().query(sql, role);
    }
    updateEmployeeRole(employeeId, roleId){
        const sql = `
            UPDATE employee SET roleid = ? WHERE id = ?
        `;
        return this.connection.promise().query(sql, [roleId, employeeId]);
    }
    updateEmployeeManager(employeeId, managerId){
        const sql = `
            UPDATE emplee SET managerid = ? WHERE id = ?
        `;
        return this.connection.promise().query(sql, [managerId, employeeId]);
    }

    getEmployeesByMang(managerid){
        const sql = `
            SELECT employee.id, employee.firstname, employee.lastname, employee.managerid
            FROM 
                employee
            WHERE employee.managerid = ? 
        `;
        return this.connection.promise().query(sql, managerid )

    }
    getEmployeesByDept(departmentid){
        const sql = `
            SELECT department.id, department.name, role.id AS roleid, role.departmentid AS roledep, employee.roleid AS emprol, employee.firstname, employee.lastname
            FROM department,
                role,
                employee
            WHERE department.id = role.departmentid AND role.id = employee.roleid AND department.id = ?
        `;
        return this.connection.promise().query(sql, departmentid )

    }
    getSalariesInDept(departmentid){
        const sql = `
            SELECT department.name AS dep_name , SUM(role.salary) AS Total
            FROM department,
                role,
                employee
            WHERE department.id = role.departmentid AND role.id = employee.roleid AND department.id = ?
        `;
        return this.connection.promise().query(sql, departmentid )

    }
    createEmployee(employee){
        const sql = `
            INSERT INTO employee SET ?
        `;
        return this.connection.promise().query(sql, employee);
    }
    createDepartment(department){
        const sql = `
            INSERT INTO department SET ?
        `;
        return this.connection.promise().query(sql, department);
    }
    removeEmployee(employeeId){
        const sql = `
            DELETE FROM employee WHERE id = ?
        `;
        return this.connection.promise().query(sql, employeeId);
    }
    removeRole(roleId){
        const sql = `
            DELETE FROM role WHERE id = ?
        `;
        return this.connection.promise().query(sql, roleId);
    }
    removeDepartment(departmentId){
        const sql = `
            DELETE FROM department WHERE id = ?
        `;
        return this.connection.promise().query(sql, departmentId);
    }
}

module.exports = new db(connection);