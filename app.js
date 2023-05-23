const express = require("express"),
    app = express(),
    users = require('./routes/users'),
    sessions = require('./services/sessions.service'),
    jwt = require('./middlewares/login.middleware')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(sessions)

app.use('/public', express.static(__dirname + '/public'))
app.use('/users', users)


app.get('/', jwt, function (req, res) {
    res.render('ejs/index.ejs')
})

app.listen(3000, () => console.log('server started'))