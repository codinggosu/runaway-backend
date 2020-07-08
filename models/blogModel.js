const Schemas = require("../schemas/schemas");
const Mongoose = require("mongoose");

module.exports = Mongoose.model("blogpost", Schemas.blogSchema);