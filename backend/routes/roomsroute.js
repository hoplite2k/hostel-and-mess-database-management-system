import express from "express";
import { protect } from "../middleware/authmiddleware.js";
const Roomrouter = express.Router();
import { getRoombyId, getRooms } from '../controllers/roomcontroller.js';

Roomrouter.route('/').get(protect, getRooms);

Roomrouter.route('/:id').get(protect, getRoombyId);

export default Roomrouter;
