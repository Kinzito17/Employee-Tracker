const connection = require("../connection");

class DBfunctions {
    constructor(connection) {
        this.connection = connection;
    }

    empAll() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
        );
    }

    //     empDept() {
    //         return this.connection.query("SELECT * FROM department", 
    //         );
    //     }

    //     empRole() {
    //         return this.connection.query("SELECT * FROM role", 
    //         );
    //     }

    //     empAdd(employee) {
    //         return this.connection.query("INSERT INTO employee SET ?", employee);
    //     }

    //     addRole(role) {
    //         return this.connection.query("INSERT INTO employee SET ?", role);
    //     }

    //     addDept(department) {
    //         return this.connection.query("INSERT INTO employee SET ?", department);
    //     }



}


module.exports = new DBfunctions(connection);