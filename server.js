const express = require("express");
const app = express();
const authRouter = require("./routes/authRout");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require('./swagger-output.json')
require("./dbconnection");
require("dotenv").config();



app.use(express.json());
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use("/auth", authRouter);


app.listen(3000);
