let io = require("socket.io");
const chatModel = require("../models/chatModel.js");

module.exports = function (app, mongoose, server) {
    io = io(server);
    console.log(server);

    let queue = [];

    //upon Connection, create room and join 
    io.on("connection", (socket) => {
        let room;
        socket.on("joinRoom", function (roomNum) {
            room = roomNum;
            ROOOOM = roomNum;
            socket.join(room);
            console.log('user joined room #' + room);

            //When on "pushQuery", push the room Number to the queue. 
            socket.on("pushQueue", function (roomNum) {
                queue.push(roomNum);
                console.log(queue);
                //Send all volunteers the updated Queue
                io.emit("updateQueue", queue);
            });
        })

        socket.on("sendMessage", function (message) {
            socket.broadcast.to(room).emit("updateMessage", message);
            console.log(`Sent to Room #${room} the message, ${message}`)
        })

        socket.on("volunteerJoined", function (dummy){
            socket.broadcast.to(room).emit("volunteerJoined","dummy");
            console.log("volunteer joined in the server side");
        })

        socket.on("observeQueue", function (roomNum) {
            io.emit("updateQueue", queue);
        })


        //Upon disconnection
        socket.on("disconnectUser", (user) => {
            console.log(user+"hey!");
            if(user === "user" || user === "volunteer"){
                let index = queue.indexOf(room);
                queue.splice(index, 1);
                console.log("room is taken out of the queue");
                if(user === "user")socket.broadcast.to(room).emit("updateMessage","USER HAS EXITED THE CHAT");
                else socket.broadcast.to(room).emit("updateMessage","**VOLUNTEER HAS EXITED THE CHAT** Please exit the page.");
                io.emit("updateQueue", queue);
                socket.disconnect();
            }
        });
    });

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
     *                      type: object
     *                      properties:
     *                          chatData:
     *                              type: object
     * 
     *      responses:
     *          "200": 
     *              description: Chat successfully saved to database 
     *          "422":
     *              description: Unable to save chat to database
     */ 
    app.post("/api/volunteer/chat", function(req, res) {
        console.log(req.body.chatData);
        console.log("called!");
        const chatTranscript = req.body.chatData;
        chatModel.create({ date: new Date(), chatData: chatTranscript }, function(err, chat) {
            if(err) {
                res.status(422).json(err);
            } else {
                console.log("chat Saved")
                res.status(200).json({ success: "Chat saved successfully", chat });
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