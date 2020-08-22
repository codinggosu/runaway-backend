const Announcement = require("../models/announcementModel");
module.exports = function (app, mongoose) {
    app.get("/api/announcement/get", function (req, res) {
        Announcement.find({}, null, { sort: "date" }, function (err, data) {
            if (err) {
                res.status(422);
            } else {
                res.status(200).json(data);
            }
        })
    });

    app.post("/api/announcement/post", function (req, res) {
        console.log(req);
        let data = req.body;
        Announcement.create({
            image: data.imageURL,
            date: new Date(),
            name: data.name,
            content: data.content,
        }, function (err, data) {
            if (err) {
                res.status(422);
            } else {
                console.log(data);
                res.status(200);
            }
        });
    });

    app.delete("/api/announcement/:id", function(req, res) {
        const id = req.params.id;

        Announcement.findByIdAndDelete(id, function(err, announcement) {
            if (err) {
                res.status(400).json({ error: "Not a valid id", err });
            } else if (!announcement) {
                res.status(404).send(`No announcement found from id: ${id}`);
            } else {
                res.status(200).json({
                    succees: "Announcement successfully deleted from database",
                    announcement
                });
            }
        });
    });
}