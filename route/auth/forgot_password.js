const Crypto = require("crypto");
const mail_sender = require('./email.js')

let User = require('../../models/volunteerModel.js');

module.exports = function (app, mongoose) {
    app.post("/api/volunteer/forgot-password/", function(req, res) { // ROUTING FOR forgot
    const email = req.body.email;
    User.findOne({email : email }, function(err, user) {
        if (err || user==undefined) {
            console.log("user not found");
            res.status(400).send('user not found');
        } else {
            Crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString("hex");
                console.log(token, "is token");
                reset_link = process.env.HOST + ":" + process.env.PORT + '/reset/' + token; // need to change with frontend link
                user.resetPasswordToken = token;
                user.resetPasswordExpiration = Date.now() + 3600000;
                user.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        mail_sender(email, 'forgot your password?', reset_link);
                        console.log("mail succcessfully sent", user);
                        res.status(200).send('password reset link sent!');
                    }
                });
            })
        }
        console.log("user", user)
    })
    console.log(email, "forgot pasword link sent to ", email);
    });
}
