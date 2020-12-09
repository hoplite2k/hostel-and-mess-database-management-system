import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from './middleware/errormiddleware.js';
import ConnectDB from "./config/db.js";

import Studentrouter from "./routes/studentsroute.js";
import Employeerouter from "./routes/employeesroute.js";
import Roomrouter from "./routes/roomsroute.js";
import Messrouter from "./routes/messroute.js";
import Userrouter from "./routes/userroutes.js";
import Uploadprofilerouter from "./routes/uploadsprofileroute.js";
import Uploadidentityrouter from "./routes/uploadsidentityroute.js";
import MLrouter from "./routes/mlroute.js";

dotenv.config();

ConnectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ extended: false }));

app.use("/students", Studentrouter);
app.use("/employees", Employeerouter);
app.use("/rooms", Roomrouter);
app.use("/mess", Messrouter);
app.use("/users", Userrouter);
app.use("/uploads/profile", Uploadprofilerouter);
app.use("/uploads/identity", Uploadidentityrouter);
app.use("/ml", MLrouter);

const __dirname = path.resolve();
app.use('/database/uploads/', express.static(path.join(__dirname, '/database/uploads/')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );

} else {
  app.get("/", async (req, res) => {
    res.json("Welcome! API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
