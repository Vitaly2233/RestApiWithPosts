const express = require("express");
const app = express();
const authRouter = require("./routes/authRout");
require("./dbconnection");
require("dotenv").config();

app.use(express.json());
app.use("/auth", authRouter);


app.listen(3000);
