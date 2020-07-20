//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require('./connection');

start();

function start() {
    inquirer.prompt({
        type: "rawlist",
        message: "What would you like to do today?",
        name: "choice",
        choices: [
            "View all employees.",
            "View all departments.",
            "View all roles.",
            "View all employess by manager.",
            "Add employee.",
            "Add a new role.",
            "Add a new department.",
            "Remove employee.",
            "Update employee role.",
            "Update employee manager.",
            "Exit"
        ]
    }).then(answer => {
        switch (answer.choice) {
            case "View all employees.":
                empAll();
                break;
            case "View all departments.":
                empDept();
                break;
            case "View all roles.":
                empRole();
                break;
            case "View all employess by manager.":
                empMan();
                break;
            case "Add employee.":
                empAdd();
                break;
            case "Add a new role.":
                addRole();
                break;
            case "Add a new department.":
                addDept();
                break;
            case "Remove employee.":
                empDel();
                break;
            case "Update employee role.":
                empUpRole();
                break;
            case "Update employee manager.":
                empUpMan();
                break;
            default:
                console.log("Thank you, have a great day!");
                connection.end();
        };
    })
}

function empAll() {
    connection.query("SELECT employee.id 'EMPLOYEE ID', employee.first_name 'FIRST NAME', employee.last_name 'LAST NAME', department.name 'DEPARTMENT', role.title 'TITLE', role.salary 'SALARY' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;", function (err, res) {
        if (err) throw err;
        "\m"
        console.table(res);
        "\n";
        start();
    })
}

function empDept() {
    connection.query("SELECT id 'DEPT ID', name 'DEPT NAME' FROM department", function (err, res) {
        if (err) throw err;
        "\m"
        console.table(res);
        "\n";
        start();
    })
}

function empRole() {
    connection.query("SELECT title 'TITLE', salary 'SALARY' FROM role", function (err, res) {
        if (err) throw err;
        "\m"
        console.table(res);
        "\n";
        start();
    })
}

function empAdd() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        }
    ]).then(answer => {
        let query = connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: null,
                manager_id: null
            },
            function (err, res) {
                if (err) throw err;

                "\n"
                console.log(answer.firstName + " has been added!")
                "\n"
            }
        );
        start();
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for the role? (123456.00)?",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department ID for this role?",
            name: "deptID"
        }
    ]).then(answer => {
        let query = connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.deptID
            },
            function (err, res) {
                if (err) throw err;

                "\n"
                console.log("The role" + answer.title + "has been added!")
                "\n"
            }
        );
        start();
    })
};

function addDept() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you'd like to add?",
            name: "name"
        }
    ]).then(answer => {
        let query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.name
            },
            (err, res) => {
                if (err) throw err;

                "\n"
                console.log("The department" + answer.name + "has been added!")
                "\n"
            }
        );
        start();
    })
};

function empDel() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "list",
                message: "Which employee's would you like to remove?",
                name: "empDel",
                choices: res.map(res => res.id + " " + res.first_name + " " + res.last_name)
            }
        ]).then(answer => {
            const delID = {}
            delID.id = parseInt(answer.empDel.split(" ")[0]);

            connection.query("DELETE FROM employee WHERE ?",
                {
                    id: delID.id
                },
                (err, res) => {
                    if (err) throw err;
                }
            );
            start();
        })
    })
}

function empUpRole() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id", (err, res) => {
        if (err) throw err;
        console.log(res);
        // SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee's role would you like to update?",
                name: "whichemp",
                choices: res.map(res => res.id + " " + res.first_name + " " + res.last_name)

                // function() {
                //     let emps = [];
                //     for (let i = 0; i < res.length; i++) {
                //         emps.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
                //     }
                //     return emps;
                // }
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "newrole",
                choices: res.map(res => res.title)
                    // [
                    //     "Senior Engineer",
                    //     "Associate Engineer",
                    //     "Sales Manager",
                    //     "Sales Associate",
                    //     "Account Manager",
                    //     "Account Representative",
                    //     "Lead Counsel",
                    //     "General Counsel",
                    //     "Controller",
                    //     "Accountant"
                    // ]
            }
        ]).then(answer => {
            const updateID = {}
            updateID.id = parseInt(answer.whichemp.split(" ")[0]);
            switch (answer.newrole) {
                case "Senior Engineer":
                    updateID.role_id = 1;
                    break;
                case "Associate Engineer":
                    updateID.role_id = 2;
                    break;
                case "Sales Manager":
                    updateID.role_id = 3;
                    break;
                case "Sales Associate":
                    updateID.role_id = 4;
                    break;
                case "Account Manager":
                    updateID.role_id = 5;
                    break;
                case "Account Representative":
                    updateID.role_id = 6;
                    break;
                case "Lead Counsel":
                    updateID.role_id = 7;
                    break;
                case "General counsel":
                    updateID.role_id = 8;
                    break;
                case "Controller":
                    updateID.role_id = 9;
                    break;
                case "Accountant":
                    updateID.role_id = 10;
                    break;
                default:
                    console.log("Please select an option fron the list")
            }
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [updateID.role_id, updateID.id], (err, res) => {
                if (err) throw err;
            })
            "\n"
            start();
            "\n"
        });
    });

};


function empUpMan() {

}