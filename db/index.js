const connection = require("./connection");
class db{
    constructor(connection){
        this.connection = connection;
    }
    getAllEmployess(){
        const sql = `
            SELECT employee.id, 
                employee.firstname, 
                employee.lastname, 
                role.title, 
                department.name AS department, 
                role.salary, 
                CONCAT(manager.firstname, " ", manager.lastname) AS manager
                FROM employee
                LEFT JOIN department ON role.departmentid = department.id
                LEFT JOIN manager on manager.id = employee.managerid;
            `;
            return this.connection.promise().query(sql)
    }
    getAllRoles(){
        const sql = `
          SELECT role.id, 
            role.title, 
            department.name AS department, 
            role.salary FROM role 
            LEFT JOIN department on role.departmentid = department.id;
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