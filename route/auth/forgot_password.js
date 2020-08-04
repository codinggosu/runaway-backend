const crypto = require("crypto")
const passport = require("passport");
const jwt = require("jsonwebtoken");
let User = require('../../models/volunteerModel.js');

module.exports = function (app, mongoose) {
    app.post("/api/volunteer/forgot-password/", function(req, res) { // ROUTING FOR forgot
    const email = req.body.email;
    User.findOne({
        email: email,
    }).then((user) => {
      if (user == null) {
        console.log("no such user");
        res.status(400).send("no such user exists");
        return;
      }
      console.log("user found");
      token = crypto.randomBytes(20).toString('hex');
      user.passwordResetToken = token;
      user.passwordResetTokenExpiration = Date.now() + 3600000;
      user.save();
      console.log(user);
      
    });

    console.log(email, "forgot pasword");
    res.status(200).send(email);
    });
}
