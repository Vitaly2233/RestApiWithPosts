const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.connect(
	process.env.DBCON,
	{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
	(err) => {
		if (err) throw err;
		else console.log("Connected to db");
	}
);
module.exports = db;
