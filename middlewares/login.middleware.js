const express = require('express')
const router = express.Router()

const jwt = router.use((req, res, next) => {
    if (!req.session.user && (!req.url.includes('users/signin') && !req.url.includes('users/signup'))) {
        res.redirect('/users/signin');
    } else {
        next();
    }
})

module.exports = jwt;