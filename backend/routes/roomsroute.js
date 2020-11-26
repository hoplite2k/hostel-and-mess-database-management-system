import express from "express";
import asyncHandler from "express-async-handler";
const Roomrouter = express.Router();
import Room from "../models/roommodel.js";

Roomrouter.get("/", asyncHandler(async (req, res) => {
  const rooms = await Room.find({});

  res.json(rooms);
}));

Roomrouter.get("/:id", asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id).populate('student1').populate('student2');
  if (room) {
    res.json(room);
  } else {
    res.status(404);
    throw new Error("Room not found");
  }
}));

export default Roomrouter;
