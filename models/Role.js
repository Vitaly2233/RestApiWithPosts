const { model, Schema } = require("mongoose");
//schema for useer's roles
const Role = new Schema({
	value: { type: String, unique: true, default: "user" },
});

module.exports = model("Role", Role);
