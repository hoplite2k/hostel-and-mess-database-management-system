import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const Studentrouter = express.Router();
import { getStudentbyId, getStudents, deleteStudent, updateStudent, addStudent, searchStudents, getallStudents } from '../controllers/studentcontroller.js';

Studentrouter.route('/').get(protect, getStudents).post(protect, admin, addStudent);
Studentrouter.route('/all').get(protect, getallStudents);
Studentrouter.route('/search').post(protect, searchStudents);
Studentrouter.route('/:id').get(protect, getStudentbyId).put(protect, admin, updateStudent).delete(protect, admin, deleteStudent);

export default Studentrouter;