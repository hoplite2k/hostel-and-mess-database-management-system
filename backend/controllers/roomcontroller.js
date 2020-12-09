import asyncHandler from "express-async-handler";
import Room from "../models/roommodel.js";

const getallRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({}).sort({ roomallocationyear: -1, roomno: 1 }).populate('inmates');

  res.json(rooms);
});

const getRooms = asyncHandler(async (req, res) => {
  var d = new Date();
  var year = d.getFullYear();
  const rooms = await Room.find({ roomallocationyear: year }).sort({ roomallocationyear: 1, roomno: 1 }).populate('inmates');

  res.json(rooms);
});

const getRoombyId = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id).populate('inmates');
  if (room) {
    res.json(room);
  } else {
    res.status(404);
    throw new Error("Room not found");
  }
});

const deleteRoomset = asyncHandler(async (req, res) => {
  if (req.body) {
    await Room.deleteMany({ $and: [{ roomallocationyear: req.body.roomallocationyear }, { roomvacatingyear: req.body.roomvacatingyear }] });
    res.json({ messsage: 'Roomset Deleted ' });
  } else {
    res.status(404);
    throw new Error("Roomset not found");
  }
});

const addRoomset = asyncHandler(async (req, res) => {
  if (req.body) {
    var i;
    const n = process.env.NUMBER_OF_ROOMS.length > 3 ? process.env.NUMBER_OF_ROOMS.length : 3;
    for (i = 1; i <= process.env.NUMBER_OF_ROOMS; i++) {
      var roomnos = '' + i;
      while (roomnos.length < n) {
        roomnos = '0' + roomnos;
      }
      const room = new Room({
        user: req.user._id,
        roomno: roomnos,
        inmates: [],
        roomallocationyear: req.body.roomallocationyear,
        roomvacatingyear: req.body.roomvacatingyear
      });

      room.save();
    }
    res.json({ messsage: "Roomset Added" });
  } else {
    res.status(400);
    throw new Error('Could not add roomset');
  }
});

const searchRooms = asyncHandler(async (req, res) => {
  if (req.body) {
    var dict = {};
    if (req.body.roomno) { const roomno = req.body.roomno; if (roomno !== '') { dict['roomno'] = roomno; } }
    if (req.body.roomallocationyear) { const roomallocationyear = Number(req.body.roomallocationyear); if (req.body.roomallocationyear !== '') { dict['roomallocationyear'] = roomallocationyear; } }
    if (req.body.roomvacatingyear) { const roomvacatingyear = Number(req.body.roomvacatingyear); if (req.body.roomvacatingyear !== '') { dict['roomvacatingyear'] = roomvacatingyear; } }

    const rooms = await Room.find(dict).sort({ roomallocationyear: 1, roomno: 1 });

    if (rooms.length > 0)
      res.status(201).json(rooms);
    else
      res.status(404).json('No room found');
  } else {
    res.status(400);
    throw new Error('Could not find rooms');
  }
});

export { getRoombyId, getRooms, addRoomset, deleteRoomset, searchRooms, getallRooms };