import express from "express";
import { protect } from "../middleware/authmiddleware.js";
const Messrouter = express.Router();
import { getMessbyId, getMesses, updateMess, deleteMess } from '../controllers/messcontroller.js';

Messrouter.route('/').get(protect, getMesses);

Messrouter.route('/:id').get(protect, getMessbyId).put(protect, updateMess).delete(protect, deleteMess);

export default Messrouter;
