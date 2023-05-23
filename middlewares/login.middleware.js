const express = require('express')
const router = express.Router()

const jwt = router.use((req, res, next) => {
    if (!req.session.user) {
        res.redirect('users/login');
    } else {
        next();
    }
})

module.exports = jwt;