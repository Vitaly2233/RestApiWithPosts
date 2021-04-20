const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.createConnection(
	process.env.DBCON,
	{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
	(err) => {
		if (err) throw err;
		else console.log("Connected to db");
	}
);
module.exports = db;
