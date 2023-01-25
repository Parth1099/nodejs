const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
  port: 3306,
});

con.connect((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = con;
