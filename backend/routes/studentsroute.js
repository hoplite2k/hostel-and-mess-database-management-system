import express from "express";
import asyncHandler from "express-async-handler";
const Studentrouter = express.Router();
import Student from "../models/studentmodel.js";

Studentrouter.get("/", asyncHandler(async (req, res) => {
  const students = await Student.find({});

  res.json(students);
}));

Studentrouter.get("/:id", asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
}));

export default Studentrouter;
