const surveyModel = require("../models/surveyModel.js");

module.exports = function (app, mongoose) {
  /**
   * @swagger
   *
   * /api/volunteer/survey:
   *  post:
   *      summary: Save survey to database
   *      tags: [Survey]
   *      requestBody:
   *          required: true
   *          content:
   *              application/json:
   *                  schema:
   *                      $ref: "#/components/schemas/Survey"
   *
   *      responses:
   *          "201":
   *              description: Survey successfully saved to database
   *          "422":
   *              description: Unable to save survey
   */
  app.post("/api/volunteer/survey", function (req, res) {
    const survey = req.body;

    surveyModel.create(survey, function (err, survey) {
      if (err) {
        res.status(422).json(err);
        console.log(err);
      } else {
        res.status(201).json({
          success: "Survey successfully saved to database",
          id: survey._id,
        });
        console.log(survey);
      }
    });
  });

  /**
   * @swagger
   *
   * /api/volunteer/survey/{id}:
   *  patch:
   *      summary: Update survey with post-chat survey
   *      tags: [Survey]
   *      parameters:
   *        - name: id
   *          in: path
   *          schema:
   *            type: string
   *          required: true
   *          description: The id of the survey to update
   *      requestBody:
   *          required: true
   *          content:
   *              application/json:
   *                  schema:
   *                      $ref: "#/components/schemas/postChat"
   *      responses:
   *          "200":
   *              description: Post-chat survey successfully saved to database
   *          "400":
   *              description: Badly formatted id
   *          "404":
   *              description: No survey matching given id
   *          "422":
   *              description: Unable to save post-chat survey
   */
  app.patch("/api/volunteer/survey/:id", function (req, res) {
    const id = req.params.id;
    const postChat = req.body;

    surveyModel.findById(id, function (err, survey) {
      if (err) {
        res.status(400).json({ error: "Not a valid id", err });
        console.log(err);
      } else if (!survey) {
        res.status(404).send(`No survey found from id: ${id}`);
      } else {
        survey.postChat = postChat;
        survey.save(function (err, survey) {
          if (err) {
            console.log(err);
            res.status(422).json(err);
          } else {
            res
              .status(200)
              .json({ success: "Survey updated successfully", survey });
            console.log(survey);
          }
        });
      }
    });
  });

  /**
   * @swagger
   *
   * /api/volunteer/survey:
   *  get:
   *      summary: Get survey responses
   *      tags: [Survey]
   *      responses:
   *          "200":
   *              description: List of surveys
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: array
   *                          items:
   *                              $ref: "#/components/schemas/Survey"
   *          "500":
   *              description: Database error
   *
   */
  app.get("/api/volunteer/survey", function (req, res) {
    surveyModel.find(function (err, surveys) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(surveys);
      }
    });
  });
};
