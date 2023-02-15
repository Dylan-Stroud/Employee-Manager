const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'SvxX7660!',
    database: 'employees_db',
},
    console.log('Connected to the employees_db database')
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;