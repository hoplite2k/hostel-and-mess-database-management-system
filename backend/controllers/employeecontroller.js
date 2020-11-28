import asyncHandler from "express-async-handler";
import Employee from "../models/employeemodel.js";

const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find({});
  
    res.json(employees);
});

const getEmployeebyId = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404);
      throw new Error("Employee not found");
    }
});

export { getEmployeebyId, getEmployees }