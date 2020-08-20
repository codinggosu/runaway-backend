const register = require("./register");
const login = require("./login");
const forgot = require("./forgot_password");
const auth_config = require("../../auth_config/passport");
const reset = require("./reset_password");
const passport = require("passport");


module.exports = function(app,mongoose){
    auth_config(app,mongoose);
    register(app,mongoose);
    login(app,mongoose);
    forgot(app, mongoose);
    reset(app, mongoose);


    app.get("/api/findUser", function (req, res) { // Routing for authenticating through JWT
        passport.authenticate("jwt", { session: false }, function (err, user) {
            console.log(user);
            if (err) {
                console.log(err)
            } else {
                res.json(user);
            }
        })(req, res);
    })
}
