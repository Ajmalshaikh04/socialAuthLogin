const router = require('express').Router()
const passport = require('passport')


router.get("/login", (req, res) => {
    res.render("login")
})

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    }),
    (req, res) => {
        res.send("login with google")
    })

router.get("/google/callback", passport.authenticate("google", { failureRedirect: '/login' }), (req, res) => {
    res.send(req.user)
})

module.exports = router