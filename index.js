const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const passportConfig = require("./passport/passport")
const passport = require("passport")


const app = express()

//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/passport")
    .then(() => console.log(`DB Connected`))

app.use(passport.initialize())



app.set("view engine", "ejs")
app.use("/auth", auth)

app.get("/", (req, res) => {
    res.render("home")
})


app.listen(4000, () => { console.log(`Server is up and running at 4000...`); })