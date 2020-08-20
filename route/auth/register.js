const passport = require("passport");
const jwt = require("jsonwebtoken");
const mail_sender = require('./email.js')


module.exports = function (app, mongoose) {
    app.post("/api/volunteer/register", function (req, res) { // ROUTING FOR REGISTERATION
        console.log(req.body);
        passport.authenticate("register", { session: false }, function (err, user,password) {
            if (err) {
                console.log(err);
            } else {
                if (user === false) {
                    res.status(422).send({
                        auth: false,
                        message:"User with the email already exists"
                    });
                }else{
                    console.log("User successfully registered");
                    mail_sender(user.email, "Your Runaway Account", `Email: ${user.email}  Password: ${password}`)
                    res.status(200).send({
                        auth:true,
                        message:"User successfully registered"
                    })
                }
            }
        })(req, res);
    });
}
