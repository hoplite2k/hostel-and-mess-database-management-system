import express from "express";
import asyncHandler from "express-async-handler";
const Employeerouter = express.Router();
import Employee from "../models/employeemodel.js";

Employeerouter.get("/", asyncHandler(async (req, res) => {
  const employees = await Employee.find({});

  res.json(employees);
}));

Employeerouter.get("/:id", asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
}));

export default Employeerouter;
