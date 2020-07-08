const eventModel = require("../models/eventModel.js");

module.exports = function(app, mongoose) {

    /**
     * @swagger
     * 
     * /api/volunteer/event:
     *  post:
     *      summary: Save event details to database
     *      tags: [Event]
     *      requestBody:
     *          required: true
     *          content: 
     *              application/json:
     *                  schema:
     *                      $ref: "#/components/schemas/Event"
     * 
     *      responses:
     *          "200": 
     *              description: Event successfully saved to database 
     */
    app.post("/api/volunteer/event", function(req, res) {
        const event = req.body;

        eventModel.create(event, function(err, eventDetails) {
            if(err) {
                res.json(err);
            } else {
                res.json({ success: "Event saved successfully", eventDetails });
            }
        });
    });

    /**
     * @swagger
     * 
     * /api/volunteer/event:
     *  get:
     *      summary: Get event details
     *      tags: [Event]
     *      parameters: 
     *        - in: query
     *          name: lat 
     *          type: number
     *          description: The latitude of the user's location
     *        - in: query
     *          name: long 
     *          type: number
     *          description: The longitude of the user's location
     * 
     *      responses:
     *          "200": 
     *              description: List of events, sorted by proximity to user if location is specified
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: "#/components/schemas/Event"
     */
    app.get("/api/volunteer/event", function(req, res) {
        const long = Number(req.query.long);
        const lat = Number(req.query.lat);

        let query = eventModel.find();

        // if location is specified, sort results by proximity to user
        if (long && lat) {
            query.where(
                { location: 
                    { $near: 
                        { $geometry: { type: "Point", coordinates: [long, lat] } }
                    }
                });
        }

        query.exec(function(err, events) {
            if(err) throw new Error(err);
            res.json(events);
        });
        
    });
}