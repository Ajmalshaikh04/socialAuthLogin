const passport = require('passport')
const User = require("../model/user")
var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: "584244937877-cpg4v2ackmvmoovesvlvi07580j0a5nv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    (accessToken, refreshToken, profile, next) => {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });

        User.findOne({ email: profile._json.email })
            .then(user => {
                if (user) {
                    console.log("User already exists in db", user);
                    next(null, user)
                    //cookietoken
                } else {
                    User.create({
                        name: profile.displayName,
                        googleId: profile.id,
                        email: profile._json.email,
                    }).then(
                        user => {
                            console.log("New User", user);
                            next(null, user)
                            //cookietoken
                        }
                    ).catch(err => console.log(err))
                }
            })
        console.log("My Profile:", profile._json.email);
        // next()
    }
));

