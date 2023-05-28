const mysql = require('mysql2');
const db_config = require('../configs/db.config');

const pool = mysql.createPool(db_config.options).promise();

/* create user table if not exist */
async function create_user_table() {
  try {
    await pool.query(`CREATE TABLE users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
);
`);
    console.log('Users table succuessfully created.');
  } catch {}
}

/* create task table if not exist */
async function create_task_table() {
  try {
    await pool.query(`CREATE TABLE tasks (
            id INT AUTO_INCREMENT,
            uid INT,
            title VARCHAR(255),
            content VARCHAR(255),
            created DATE,
            PRIMARY KEY (id),
            FOREIGN KEY (uid) REFERENCES users(id)
        );
`);
    console.log('Tasks table succuessfully created.');
  } catch {}
}

/* register users */
async function register(username, password) {
  try {
    await pool.query('INSERT INTO users (username,password) VALUES (?,?)', [
      username,
      password,
    ]);
    return true;
  } catch {
    return false;
  }
}
/* login users */
async function login(usernameOrEmail, password) {
  const [user] = await pool.query(
    'SELECT * FROM users WHERE  (username = ? OR email = ?) AND password = ?',
    [usernameOrEmail, usernameOrEmail, password],
  );
  if (user.length > 0) {
    return user[0];
  }
  return null;
}
create_user_table(); // must come before task
create_task_table();
module.exports = { register, login, pool };
