const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcryptjs");

// Use Local Strategy for email and password authentication
module.exports = function (passport) {
    passport.use(new LocalStrategy(
        // Our user will sign in using an email, rather than a "username"
        {
            usernameField: "email"
        },
        function(email, password, done) {
            // Look for the user with the inputted email
            db.User.findOne({ 
                where: { email: email } 
            }).then(user => { 
                if (!user) return done(null, false);

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            })
        })
    );


    // User (de)serialize methods to keep authentication state across requests

    // Tell passport how to serialize the user, or how to store a user in the session
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
      });
      
      // Tell passport how to get a user out of the session
      passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
      });
}