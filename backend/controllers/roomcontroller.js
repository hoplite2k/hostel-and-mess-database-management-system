import asyncHandler from "express-async-handler";
import Room from "../models/roommodel.js";

const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find({});
  
    res.json(rooms);
});

const getRoombyId = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id).populate('student1').populate('student2');
    if (room) {
      res.json(room);
    } else {
      res.status(404);
      throw new Error("Room not found");
    }
});

export { getRoombyId, getRooms };