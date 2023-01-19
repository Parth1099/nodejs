const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "test",
  port: 3306,
});

con.connect((err) => {
  if (err) {
    console.log("Error In Conncection");
  }
});

module.exports = con;
