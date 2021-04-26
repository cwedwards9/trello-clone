const db = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;
        const user = await db.User.findOne({where: { email: email }});
        try {
            if(user) {console.log(`user ${user} exists`); return res.status(409).json("A user with that email already exists!");}
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await db.User.create({...req.body, password: hashedPassword});
                console.log(newUser);

                req.logIn(newUser, error => {
                    if(error) return res.status(500).json("Oh no, something went wrong");
                    return res.json({ user: { id: req.user.id, name: req.user.name } });
                })
            }
        } catch(e) {
            console.log(e);
            return res.status(500).json("Oh no, something went wrong");
        }
    },
    login: (req, res, next) => {
      passport.authenticate("local", (error, user, info) => {
        if(error) return res.status(500).json("Oh no, something went wrong");
        if(!user) return res.status(409).json("Username or password is incorrect!"); 
        req.logIn(user, error => {
          if(error) return res.status(500).json("Oh no, something went wrong");
          return res.json({ userSession: req.user }); 
        })
      })(req, res, next);
    },
    logout: async (req, res) => {
        await req.logout();
        res.end();
    }
};