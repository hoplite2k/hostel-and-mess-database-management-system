import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const Studentrouter = express.Router();
import { getStudentbyId, getStudents, deleteStudent, updateStudent } from '../controllers/studentcontroller.js';

Studentrouter.route('/').get(protect, getStudents);

Studentrouter.route('/:id').get(protect, getStudentbyId).put(protect, admin, updateStudent).delete(protect, admin, deleteStudent);

export default Studentrouter;