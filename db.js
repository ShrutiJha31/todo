const util = require("util");
const mysql = require("mysql");

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : "remotemysql.com",
  user            : "ToeVvSYMb7",
  password        : "83EYFIiabn",
  database        : "ToeVvSYMb7"
})
 
pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database");
  }
  if (connection){

    let createTodos = `create table if not exists events(
      id int primary key auto_increment,
      eventName text,
      eventDate date
  )`;
    connection.query(createTodos, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
      else
      {
        console.log("Table Created Successfully!")
      }
    });
    
    connection.release()};
  return;
});

pool.query = util.promisify(pool.query);
module.exports = pool;
