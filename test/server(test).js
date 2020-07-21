const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("../connection");
const dbfunctions = require("./index(test)");

start();

async function start() {
    const { choice } = await prompt([
        {
            type: "rawlist",
            message: "What would you like to do today?",
            name: "choice",
            choices: [
                {
                    name: "View all employees.",
                    value: "viewAll"
                },
                {
                    name: "View all employees by departments.",
                    value: "empDept"
                },
                {
                    name: "View all employees by role.",
                    value: "empRole"
                },
                {
                    name: "View all employees by manager.",
                    value: "empManager"
                },
                {
                    name: "Add an employee.",
                    value: "empAdd"
                },
                {
                    name: "Add a new role.",
                    value: "addRole"
                },
                {
                    name: "Add a new department.",
                    value: "addDept"
                },
                {
                    name: "Remove an employee.",
                    value: "empDel"
                },
                {
                    name: "Update employee role.",
                    value: "empUpRole"
                },
                {
                    name: "Update employee manager.",
                    value: "empUpMan"
                },
                {
                    name: "Exit",
                    value: "exit"
                }
            ]
        }
    ]);
    switch (choice) {
        case "viewAll":
            return empAll();
        case "empDept":
            return empDept();
        case "empRole":
            return empRole();
        case "empManager":
            return empManager();
        case "empAdd":
            return empAdd();
        case "addRole":
            return addRole();
        case "addDept":
            return addDept();
        case "empDel":
            return empDel();
        case "empUpRole":
            return empUpRole();
        case "empUpMan":
            return empUpMan();
        default:
            console.log("Thank you, have a great day!");
            connection.end();
    };
}

async function empAll() {
    const employees = await dbfunctions.empAll();
    console.table(employees);
    start();
}

async function empAdd() {
    const roles = await dbfunctions.empRole();
    const employees = await dbfunctions.empAll();

    const employee = await prompt([
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
    ]);
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt(
        {
            type: "list",
            message: "What is the employee's role?",
            name: "role",
            choices: roleChoices

        });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });
    employee.manager_id = managerId;
    await dbfunctions.empAdd(employee);
    start();
}

async function empUpRole() {
    const employees = await dbfunctions.empAll();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee would you like to update?",
            choices: employeeChoices
        }
    ]);
    const roles = await dbfunctions.empRole();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    const { roleId } = await prompt([
        {
            type: "list",
            message: "What is the selected employee's role?",
            name: "role",
            choices: roleChoices

        }
    ]);

    await dbfunctions.empUpRole(employeeId, roleId)
    console.log("Updated emplyee role")
    start();

}

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
        }
    ]).then(answer => {
        let query = connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: null
            },
            function (err, res) {
                if (err) throw err;

                "\n"
                console.log("The role " + answer.title + "has been added!")
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
            message: "What deaprtment would you like to add?",
            name: "department"
        }
    ]).then(answer => {
        let query = connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department
            },
            function (err, res) {
                if (err) throw err;

                "\n"
                console.log("A new department, " + answer.department + " has been added!")
                "\n"
            }
        );
        start();
    })
};

function empUpRole() {
    let emps = []
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            let emp = res[i].id + " " + res[i].first_name + " " + res[i].last_name;
            emps.push(emp);
            console.log(emps);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee's role would you like to update?",
                name: "whichemp",
                choices: emps
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "newrole",
                choices: [
                    "Senior Engineer",
                    "Associate Engineer",
                    "Sales Manager",
                    "Sales Associate",
                    "Account Manager",
                    "Account Representative",
                    "Lead Counsel",
                    "General Counsel",
                    "Controller",
                    "Accountant"
                ]
            }
        ]).then(answer => {
            const updateID = {}
            updateID.id = parseInt(answer.whichemp.split(" ")[0]);
            switch (answer.newrole) {
                case "Senior Engineer":
                    updateID = role_id = 1;
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



