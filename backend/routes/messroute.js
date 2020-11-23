import express from "express";
import asyncHandler from "express-async-handler";
const Messrouter = express.Router();
import Mess from "../models/messmodel.js";

Messrouter.get("/", asyncHandler(async (req, res) => {
  const mess = await Mess.find({});

  res.json(mess);
}));

Messrouter.get("/:id", asyncHandler(async (req, res) => {
  const mess = await Mess.findById(req.params.id);
  if (mess) {
    res.json(mess);
  } else {
    res.status(404);
    throw new Error("Mess detail not found");
  }
}));

export default Messrouter;
