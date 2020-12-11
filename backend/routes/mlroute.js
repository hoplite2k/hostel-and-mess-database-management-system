import express from "express";
import { protect } from "../middleware/authmiddleware.js";
const MLrouter = express.Router();
import { linear_regression } from "../controllers/mlcontroller.js";

MLrouter.route('/').get(protect, linear_regression);

export default MLrouter;