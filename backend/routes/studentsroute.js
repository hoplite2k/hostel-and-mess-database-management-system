import express from "express";
import { protect } from "../middleware/authmiddleware.js";
const Studentrouter = express.Router();
import { getStudentbyId, getStudents } from '../controllers/studentcontroller.js';

Studentrouter.route('/').get(protect, getStudents);

Studentrouter.route('/:id').get(protect, getStudentbyId);

export default Studentrouter;