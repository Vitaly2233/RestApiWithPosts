const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema(
	{
		password: { type: String, required: true },

		username: { type: String, required: true },

		token: { type: String, reqired: true },
	},
	{ collection: "UsersDatabase" }
);
module.exports = mongoose.model("AuthData", userSchema);
