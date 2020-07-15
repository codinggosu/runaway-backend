const bodyParser = require("body-parser");
const Cors = require("cors");
const http = require('http');
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./route/auth/auth");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 7000;
const server = http.createServer(app);

// Swagger documentation
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express"); 

const options = {
    definition: {
        openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: "Runaway API", // Title (required)
            version: "1.0.0", // Version (required)
            servers: ["http://localhost:7000"]
        },
    },
        // Path to the API docs
        apis: ["./route/*.js", "./schemas/schemas.js"]
    };

//Routes
const blogRoute = require("./route/blog.js");
const chatRoute = require("./route/chat/chat.js");
const chatDataHandler = require("./route/chat.js"); //to be merged into chatRoute soon
const eventRoute = require("./route/event.js");
const resourceRoute = require("./route/resource.js");
const surveyRoute = require("./route/survey.js")

//connect to the database // for now, the password will be in the file
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://runaway-database:2gn5YAq0BRwLc7tF@runaway-mrvci.mongodb.net/runaway?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Connection succeeded");
});

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

//MiddleWare
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));



app.get("/", function(req,res){
    return res.status(200).send("Hello World");
})


//Route function called
blogRoute(app,mongoose);
auth(app,mongoose);
chatRoute(app,mongoose,server);
chatDataHandler(app,mongoose);
eventRoute(app, mongoose);
resourceRoute(app, mongoose);
surveyRoute(app, mongoose);

app.set("json spaces", 2);



server.listen(PORT,() => {
    console.log("Hopefully the server is running on "+ PORT);
})

module.exports = app;
