const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");
const bcrypt = require("bcryptjs");

// shorthand
const log = console.log

module.exports = () => {
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    })

    passport.deserializeUser((id, cb) => {
        db.User.findOne({
            where: {
                id: id
            }
        }).then(user => {
            log(`\nDeserialize User:`, user.dataValues)
            cb(null, user)
        });
    });

    // Sign up 
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            log("\nLocal Signup Strategy Hit")
            var passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8))

            // If we find a user in our database with the same email, they cannot make an account. Must be a different email
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                // log("after db search")
                console.log("after db search")
                if (user) {
                    log("\nUser already exists")
                    return done(null, false, {
                        message: "That email is already taken"
                    })
                } else {
                    log("\nUser does not exist, will continue creating new user");
                    log(req.body)
                    var data = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: passwordHash,
                        image: req.body.image
                    }
                    db.User.create(data).then(newUser => {

                        if (!newUser) {
                            log("User was not created");
                            return done(null, false);
                        }
                        if (newUser) {
                            log("User created:", newUser.dataValues)
                            return done(null, newUser)
                        }

                    })
                }
            })
        }
    ))

    // Login

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: "password",
        passReqToCallback: true
    },
        (req, email, password, done) => {
            log('\nLogin Strategy Hit')
            log(req.body)

            // Function for comparing passwords
            var isValidPassword = (userpass, password) => {
                return bcrypt.compareSync(password, userpass)
            }

            // Find the email in our db
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {

                // If not found
                if (!user) {
                    log("No user found")
                    return done(null, false, {
                        message: "No user found"
                    })
                }

                // If user is found, compare the user password with login password
                if (!isValidPassword(user.password, password)) {
                    log("Incorrect password");
                    return done(null, false, {
                        message: "Incorrect Password"
                    })
                }

                // User is now logged in 
                var userInfo = user.get();
                return done(null, userInfo);
            }).catch((err) => {
                log("Error:", err)
                return done(null, false, {
                    message: 'Something went wrong with you Sign-In'
                })
            })
        }
    ));
}