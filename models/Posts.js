const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
	_id: { type: String, required: true },
	Name: { type: String, required: true },
	Description: { type: String, required: true },
});
module.exports = mongoose.model("posts", postSchema);