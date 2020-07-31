const Announcement = require("../models/announcementModel");
module.exports = function(app,mongoose){
    app.get("/api/announcement/get",function(req,res){
        Announcement.find({},null,{sort: "date"},function(err,data){
            if(err){
                res.status(422);
            }else{
                res.status(200).json(data);
            }
        })
    });

    app.post("/api/announcement/post",function(req,res){
        let data = req.body;
        console.log(req);
        Announcement.create({
            image: data.image,
            date: new Date(),
            name : data.name,
            content: data.content,
        }).exec(function(err,data){
            if(err){
                res.status(422);
            }else{
                res.status(200);
            }
        })
    });
}