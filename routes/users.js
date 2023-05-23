
const express = require('express'),
    dbService = require('../services/db.service')

const router = express.Router()


//render register/login
router.get('/', async function (req, res) {
    res.render('ejs/index.ejs')
})

//render login
router.get('/login', async function (req, res) {
    res.render('ejs/index.ejs')
    //save in req.session.user
})

//render register
router.get('/register', async function (req, res) {
    res.render('ejs/index.ejs')
})

//render logout
router.get('/logout', async function (req, res) {
    req.session.destroy();
    res.redirect('login')
})

module.exports = router