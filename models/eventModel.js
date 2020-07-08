const eventSchema = require("../schemas/schemas").eventSchema;
const Mongoose = require("mongoose");

eventSchema.index({ location: "2dsphere" });

module.exports = Mongoose.model("Event", eventSchema);