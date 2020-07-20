const mysql = require("mysql");
const util = require("util");

//mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dbpassword",
    database: "employeeDB"
});

connection.connect(err => {
    if (err) throw err;
})

connection.query = util.promisify(connection.query);


module.exports = connection;