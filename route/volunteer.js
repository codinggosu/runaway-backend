const volunteerModel = require("../models/volunteerModel.js");

module.exports = function (app, mongoose) {
  app.get("/api/volunteer", function (req, res) {
    const search = req.query.search;

    let query = volunteerModel.find({ access: "volunteer" });

    if (search) {
      query.where({ email: { $regex: search, $options: "i" } });
    }

    query.exec(function (err, volunteers) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(volunteers);
      }
    });
  });

  app.post("/api/volunteer", function (req, res) {
    const volunteer = req.body;

    volunteerModel.create(volunteer, function (err, volunteer) {
      if (err) {
        res.status(422).json(err);
      } else {
        res.status(200).json({
          success: "Volunteer successfully saved to database",
          volunteer,
        });
      }
    });
  });

  app.patch("/api/volunteer/:id", function (req, res) {
    const id = req.params.id;
    const changes = req.body;

    volunteerModel.findById(id, function (err, volunteer) {
      if (err) {
        res.status(400).json({ error: "Not a valid id", err });
        console.log(err);
      } else if (!volunteer) {
        res.status(404).send(`No volunteer found from id: ${id}`);
      } else {
        if (changes.hasOwnProperty("email")) {
          volunteer.email = changes.email;
        }
        if (changes.hasOwnProperty("username")) {
          volunteer.email = changes.email;
        }
        volunteer.save(function (err, volunteer) {
          if (err) {
            console.log(err);
            res.status(422).json(err);
          } else {
            res
              .status(200)
              .json({ success: "Volunteer updated successfully", volunteer });
            console.log(volunteer);
          }
        });
      }
    });
  });

  app.delete("/api/volunteer/:id", function (req, res) {
    const id = req.params.id;

    volunteerModel.findByIdAndDelete(id, function (err, volunteer) {
      if (err) {
        res.status(400).json({ error: "Not a valid id", err });
      } else if (!volunteer) {
        res.status(404).send(`No volunteer found from id: ${id}`);
      } else {
        res.status(200).json({
          succees: "Volunteer successfully deleted from database",
          volunteer,
        });
      }
    });
  });
};
