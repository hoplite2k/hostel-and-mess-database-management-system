import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const Studentrouter = express.Router();
import { getStudentbyId, getStudents, deleteStudent, updateStudent, addStudent } from '../controllers/studentcontroller.js';

Studentrouter.route('/').get(protect, getStudents).post(protect, admin, addStudent);

Studentrouter.route('/:id').get(protect, getStudentbyId).put(protect, admin, updateStudent).delete(protect, admin, deleteStudent);

export default Studentrouter;