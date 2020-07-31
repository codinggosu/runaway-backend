const Schemas = require("../schemas/schemas");
const mongoose = require("mongoose");

module.exports = mongoose.model("announcement", Schemas.announcementSchema);