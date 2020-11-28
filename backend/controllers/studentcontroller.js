import asyncHandler from "express-async-handler";
import Student from "../models/studentmodel.js";

const getStudents = asyncHandler (async (req, res) => {
    const students = await Student.find({});
  
    res.json(students);
});

const getStudentbyId = asyncHandler (async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

export { getStudentbyId, getStudents };