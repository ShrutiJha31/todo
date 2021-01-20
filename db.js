const util = require("util");
const mysql = require("mysql");

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.HOST||'localhost',
  user            : process.env.DB_USER||'root',
  password        : process.env.DB_PASSWORD||'Shivam@25',
  database        : process.env.DATABASE||'todo-app'
})
 
pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database");
  }
  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);
module.exports = pool;
