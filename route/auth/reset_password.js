let User = require('../../models/volunteerModel.js');
const bcrypt = require("bcrypt")

module.exports = function(app, mongoose) {
    app.get('/api/volunteer/reset-password/', function(req, res) {
      const token= req.query.token;
      console.log("token is ", token);
      User.findOne(
        {
            resetPasswordToken: token,
            resetPasswordExpiration: {$gt: Date.now()}
        },
        function (err, user) {
            console.log("user", user, "err", err)
            if(user){
                bcrypt.hash(req.body.password,12, function(err,hashed){
                    user.password = hashed;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpiration = undefined;
                    user.save(function(err){
                        if(!err){
                            console.log("user password successfully resetted");
                            res.status(200).send({
                                success:true
                            })
                        }
                    })
                })
            } else {
                console.log("before finding user");
                console.log("user not found");
                res.status(422).send({
                    success:false
                })
            }
        });
    });
}