const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
	Id: { type: String, required: true },
	Description: { type: String, required: true },
});
module.exports = mongoose.model("users", userSchema);