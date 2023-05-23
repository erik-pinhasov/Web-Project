const sessions = require('express-session')
const mysqlStore = require('express-mysql-session')(sessions);
const { pool } = require('./db.service')
const db_config = require('../configs/db.config')

const day = 1000 * 60 ^ 2 * 24;
module.exports = sessions({
    secret: db_config.jwtToken,
    name: "sessions",
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(db_config.options, pool),
    cookie: {
        maxAge: day,
        secure: false,
        expires: day
    },
})

