const resourceModel = require("../models/resourceModel.js");

module.exports = function (app, mongoose) {
  /**
   * @swagger
   *
   * /api/volunteer/resource:
   *  post:
   *      summary: Save resource to database
   *      tags: [Resource]
   *      requestBody:
   *          required: true
   *          content:
   *              application/json:
   *                  schema:
   *                      $ref: "#/components/schemas/Resource"
   *
   *      responses:
   *          "200":
   *              description: Resource successfully saved to database
   *          "422":
   *              description: Unable to save resource
   */
  app.post("/api/volunteer/resource", function (req, res) {
    const resource = req.body;

    resourceModel.create(resource, function (err, doc) {
      if (err) {
        res.status(422).json(err);
      } else {
        res
          .status(200)
          .json({
            success: "Resource successfully saved to database",
            resource: doc,
          });
      }
    });
  });

  /**
   * @swagger
   *
   * /api/volunteer/resource:
   *  get:
   *      summary: Get resources from database, filtered by categories if filters are specified
   *      tags: [Resource]
   *      parameters:
   *        - in: query
   *          name: filter
   *          schema:
   *              type: array
   *              items:
   *                  type: string
   *          description: Categories to filter the resources by
   *        - in: query
   *          name: search
   *          schema:
   *              type: string
   *          description: Term to search through the resource titles by
   *
   *      responses:
   *          "200":
   *              description: List of resources
   *              content:
   *                  application/json:
   *                      schema:
   *                          type: array
   *                          items:
   *                              $ref: "#/components/schemas/Resource"
   *          "500":
   *              description: Database error
   *
   */
  app.get("/api/volunteer/resource", function (req, res) {
    const filters = req.query.filter;
    const search = req.query.search;

    let query = resourceModel.find();

    if (filters) {
      query.where({ categories: { $in: filters } });
    }

    if (search) {
      query.where({ title: { $regex: `${search}`, $options: "i" } });
    }

    query.exec(function (err, resources) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(resources);
      }
    });
  });
};
