const express = require("express");
const app = express();
const authRouter = require("./routes/authRout");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("./dbconnection");
require("dotenv").config();

const options = {
   definition: {
      opeanpi: "3.0.0",
      info: {
         title: "Posts",
         version: "1.0.0",
         description: "Rest api project with user posts"
      },
      servers: [{ url: "http://localhost:3000" }]
   },
   apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

app.use(express.json());
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/auth", authRouter);


app.listen(3000);
