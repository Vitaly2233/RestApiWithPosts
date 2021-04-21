const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
	password: { type: String, unique: true, required: true },
	username: { type: String, required: true },
	roles: [{ type: String, ref: "Role" }],
});
module.exports = mongoose.model("users", userSchema);
