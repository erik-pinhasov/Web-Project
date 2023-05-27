
const express = require('express'),
    dbService = require('../services/db.service')

const router = express.Router()


//render register/login
router.get('/', async function (req, res) {
    res.render('ejs/index.ejs')
})

//render login
router.get('/signin', async function (req, res) {
    renderSignTabs(res, 'signin', 'signup');
    //save in req.session.user
})

//render register
router.get('/signup', async function (req, res) {
    renderSignTabs(res, 'signup', 'signin');
})

function renderSignTabs(res, activeTab, inactiveTab) {
    res.render(`ejs/sign-tabs.ejs`, { active: activeTab, notactive: inactiveTab })
}
//render logout
router.get('/logout', async function (req, res) {
    req.session.destroy();
    res.redirect('login')
})

module.exports = router