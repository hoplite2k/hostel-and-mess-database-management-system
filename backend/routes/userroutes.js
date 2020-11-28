import express from "express";
const Userrouter = express.Router();
import { authUser, getUserProfile, updateUserPassword } from '../controllers/usercontroller.js';
import { protect } from "../middleware/authmiddleware.js";

Userrouter.post("/login", authUser);
Userrouter.route("/profile").get(protect, getUserProfile).put(protect, updateUserPassword);

export default Userrouter;