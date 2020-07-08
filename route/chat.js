const chatModel = require("../models/chatModel.js");

module.exports = function(app, mongoose) {

    /**
     * @swagger 
     * 
     * /api/volunteer/chat:
     *  post:
     *      summary: Save chat transcript to database
     *      tags: [Chat]
     *      requestBody: 
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: "#/components/schemas/Chat"
     * 
     *      responses:
     *          "200": 
     *              description: Chat successfully saved to database 
     */ 
    app.post("/api/volunteer/chat", function(req, res) {
        const chatTranscript = req.body;

        chatModel.create(chatTranscript, function(err, chat) {
            if(err) {
                res.json(err);
            } else {
                res.json({ success: "Chat saved successfully", chat });
            }
        });
    });

    /**
     * @swagger 
     * 
     * /api/volunteer/chat:
     *  get:
     *      summary: Get chat transcripts
     *      tags: [Chat]
     *      responses:
     *          "200": 
     *              description: List of chat transcripts
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: "#/components/schemas/Chat"
     * 
     */
    app.get("/api/volunteer/chat", function(req, res) {
        chatModel.find(function(err, chats) {
            if(err) throw new Error(err);
            res.json(chats);
        });
    });

}