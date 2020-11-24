import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from './middleware/errormiddleware.js';
import ConnectDB from "./config/db.js";

import Studentrouter from "./routes/studentsroute.js";
import Employeerouter from "./routes/employeesroute.js";
import Roomrouter from "./routes/roomsroute.js";
import Messrouter from "./routes/messroute.js";

dotenv.config();

ConnectDB();

const app = express();

app.get("/", async (req,res) => {
  res.json("Welcome!");
});

app.use("/students", Studentrouter);
app.use("/employees", Employeerouter);
app.use("/rooms", Roomrouter);
app.use("/mess", Messrouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
