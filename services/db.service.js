const mysql = require("mysql2");
const db_config = require('../configs/db.config')

const pool = mysql.createPool(db_config.options).promise()

/*register users*/
async function register(username, password) {
    try {
        await pool.query("INSERT INTO users (username,password) VALUES (?,?)", [
            username,
            password,
        ]);
        return true;
    } catch {
        return false;
    }
}
/*login users*/
async function login(username, password) {
    var [user] = await pool.query("SELECT * FROM users WHERE username = ? and password = ?", [
        username, password
    ]);
    if (user.length > 0) {
        return user[0];
    } else {
        return null;
    }
}
module.exports = { register, login, pool }