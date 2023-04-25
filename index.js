const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const passportConfig = require("./passport/passport")
const passport = require("passport")
const cookieSession = require('cookie-session')
const expressSession = require('express-session')

const app = express()

//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/passport")
    .then(() => console.log(`DB Connected`))

app.use(cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ['thisisAnysecretkey']  //env
}))

// // register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

// app.use(expressSession({
//     secret: 'somethingsecretgoeshere',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true, maxAge: 3 * 24 * 60 * 60 * 1000, }
// }));

app.use(passport.initialize())
app.use(passport.session())

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
    }
    next();
};



app.set("view engine", "ejs")
app.use("/auth", auth)
app.get("/", isLoggedIn, (req, res) => {
    res.render("home")
})


app.listen(4000, () => { console.log(`Server is up and running at 4000...`); })