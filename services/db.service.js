const mysql = require("mysql2");
const db_config = require("../configs/db.config");
const { Tasks, Task } = require("../entities/task");
const User = require("../entities/user");

class PoolSingleton {
  // Create MySQL instance
  constructor() {
    this.pool = mysql.createPool(db_config.options).promise();
  }

  static getInstance() {
    if (!PoolSingleton.instance) PoolSingleton.instance = new PoolSingleton();
    return PoolSingleton.instance.pool;
  }
}

const pool = PoolSingleton.getInstance();

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 to the month since it is zero-based
  const day = String(today.getDate());
  return `${year}-${month}-${day}`;
}

// Insert user details after registeration
async function register(username, email, password) {
  const insertQuery =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const selectQuery = "SELECT * FROM users WHERE username = ?";

  try {
    await pool.query(insertQuery, [username, email, password]);
    const [rows] = await pool.query(selectQuery, [username]);
    return rows.length > 0 ? new User(rows[0]) : null;
  } catch (error) {
    return error;
  }
}

// Get user details after login
async function login(usernameOrEmail, password) {
  return await pool
    .query(
      "SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?",
      [usernameOrEmail, usernameOrEmail, password]
    )
    .then(([rows]) => {
      return rows.length > 0 ? new User(rows[0]) : null;
    })
    .catch((error) => {
      return error;
    });
}

// Count number of open today tasks
async function countTodayTasks(userid) {
  const today = getTodayDate();
  return await pool
    .query(
      "SELECT COUNT(*) as count FROM tasks WHERE uid = ? AND done = 0 AND DATE(start) = ? ",
      [userid, today]
    )
    .then(([rows]) => {
      return rows[0].count;
    })
    .catch((error) => {
      throw error;
    });
}

// Count number of open upcoming tasks
async function countUpcomingTasks(userid) {
  const today = getTodayDate();
  const startDateTime = today + " 00:00:00";
  return await pool
    .query(
      "SELECT COUNT(*) as count FROM tasks WHERE uid = ? AND done = 0 AND start >= ?",
      [userid, startDateTime]
    )
    .then(([rows]) => {
      return rows[0].count;
    })
    .catch((error) => {
      throw error;
    });
}

// Get all open today tasks
async function getTodayTasks(userid) {
  const today = getTodayDate();
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 0 AND DATE(start) = ? ORDER BY start ASC",
      [userid, today]
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      throw error;
    });
}

// Get all open upcoming tasks
async function getAllTasks(userid) {
  const today = getTodayDate();
  const startDateTime = today + " 00:00:00";
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND start >= ? AND done = 0 ORDER BY start ASC",
      [userid, startDateTime]
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      throw error;
    });
}

// Get all closed tasks
async function getDoneTasks(userid) {
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 1 ORDER BY start ASC",
      [userid]
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      throw error;
    });
}

// Get all open tasks their date is passed
async function getIncompleteTasks(userid) {
  return await pool
    .query(
      "SELECT * FROM tasks WHERE uid = ? AND done = 0 AND start < NOW() ORDER BY start ASC",
      [userid]
    )
    .then(([rows]) => {
      return new Tasks(rows);
    })
    .catch((error) => {
      throw error;
    });
}

async function deleteTask(taskid) {
  return await pool
    .query("DELETE FROM tasks WHERE id = ?", [taskid])
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      throw error;
    });
}

async function finishTask(taskid) {
  return await pool
    .query("UPDATE `tasks` SET `done` = 1 WHERE `id` = ?", [taskid])
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      throw error;
    });
}

// Update existing task details
async function updateTask(task) {
  return await pool
    .query(
      "UPDATE `tasks` SET title = ?, content = ? ,start = ? ,created = NOW()  WHERE `id` = ?",
      [task.title, task.content, task.start, task.id]
    )
    .then(([rows]) => {
      return rows.affectedRows > 0;
    })
    .catch((error) => {
      throw Error(error);
    });
}

// Insert a new task
async function addTask(uid, task) {
  const insertQuery =
    "INSERT INTO `tasks` (uid, title, content, start, created, done) VALUES (?, ?, ?, ?, NOW(), 0)";
  const selectQuery = "SELECT * FROM tasks WHERE id = LAST_INSERT_ID()";

  try {
    await pool.query(insertQuery, [uid, task.title, task.content, task.start]);
    const [rows] = await pool.query(selectQuery);
    return rows.length > 0 ? new Task(rows[0]) : null;
  } catch (error) {
    return null;
  }
}

// Update user details
async function editProfile(task) {
  let query;
  let params;
  if (task.password) {
    query =
      "UPDATE `users` SET username = ?, email = ?, password = ? WHERE `id` = ?";
    params = [task.username, task.email, task.password, task.id];
  } else {
    query = "UPDATE `users` SET username = ?, email = ? WHERE `id` = ?";
    params = [task.username, task.email, task.id];
  }
  try {
    const [rows] = await pool.query(query, params);
    return rows.affectedRows > 0;
  } catch (error) {
    throw new Error(error);
  }
}

// Get a task by start time
async function getCurrentTask(userid, startDateTime) {
  return await pool
    .query(
      "SELECT id,title FROM tasks WHERE uid = ? AND start = ? AND done = 0",
      [userid, startDateTime]
    )
    .then(([rows]) => {
      return rows;
    })
    .catch((error) => {
      throw error;
    });
}

//TODO: add task
module.exports = {
  register,
  login,
  pool,
  getAllTasks,
  deleteTask,
  finishTask,
  getTodayTasks,
  getDoneTasks,
  getIncompleteTasks,
  getIncompleteTasks,
  countTodayTasks,
  countUpcomingTasks,
  updateTask,
  addTask,
  editProfile,
  editProfile,
  getCurrentTask,
};
