const passport = require("passport");
const jwt = require("jsonwebtoken");


module.exports = function (app, mongoose) {
    app.post("/api/volunteer/login", function (req, res, next) { // ROUTING FOR LOGIN
        passport.authenticate("login", { session: false }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user === false) {
                    console.log("Failed :(");
                    res.status(422).send({
                        auth: false,
                        message: "Username or password is wrong"
                    });
                } else {
                    req.logIn(user, function (err) {
                        const token = jwt.sign({ email: user.email }, "temp");//change this later
                        console.log("LOGGED IN!");
                        console.log(user.access);
                        res.status(200).json({
                            auth: true,
                            token: token,
                            user: user,
                            access: user.access
                        })
                    })
                }
            }
        })(req, res, next);
    });
}