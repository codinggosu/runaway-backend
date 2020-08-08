const passport = require("passport");
const jwt = require("jsonwebtoken");
const Crypto = require("crypto");
const { userInfo } = require("os");
const mail_sender = require('./email.js')

let User = require('../../models/volunteerModel.js');

module.exports = function (app, mongoose) {
    app.post("/api/volunteer/forgot-password/", function(req, res) { // ROUTING FOR forgot
    const email = req.body.email;
    User.findOne({email : email }, function(err, user) {
        if (err || user==undefined) {
            console.log("user not found");
            res.status(400).send('user not found')
        }
        else {
            Crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString("hex");
                console.log(token, "is token")
                reset_link = process.env.BASE_URL + '/reset' + token;
                user.resetPasswordToken = token;
                user.resetPasswordExpiration = Date.now() + 3600000;
                user.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        mail_sender(email, 'forgot your password?', reset_link);
                        console.log("mail succcessfully sent");
                        res.status(200).send('password reset link sent!')
                    }
                });
            })
        }
    })
//        passport.authenticate("login", { session: false }, function (err, user) {
//            if (err) {
//                console.log(err);
//            } else {
//                if (user === false) {
//                    console.log("Failed :(");
//                    res.status(422).send({
//                        auth: false,
//                        message: "Username or password is wrong"
//                    });
//                } else {
//                    req.logIn(user, function (err) {
//                        const token = jwt.sign({ email: user.email }, "temp");//change this later
//                        console.log("LOGGED IN!");
//                        console.log(user.access);
//                        res.status(200).json({
//                            auth: true,
//                            token: token,
//                            access: user.access
//                        })
//                    })
//                }
//            }
//        })(req, res, next);
    console.log(email, "forgot pasword");
    });
}
