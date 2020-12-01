import asyncHandler from "express-async-handler";
import Mess from "../models/messmodel.js";

const getMesses = asyncHandler(async (req, res) => {
  const mess = await Mess.find({});

  res.json(mess);
});

const getMessbyId = asyncHandler(async (req, res) => {
  const mess = await Mess.findById(req.params.id);
  if (mess) {
    res.json(mess);
  } else {
    res.status(404);
    throw new Error("Mess detail not found");
  }
});

const deleteMess = asyncHandler(async (req, res) => {
  const mess = await Mess.findById(req.params.id);
  if (mess) {
    await mess.remove();
    res.json({ messsage: 'Mess Detail Deleted ' });
  } else {
    res.status(404);
    throw new Error("Mess Detail not found");
  }
});

const updateMess = asyncHandler(async (req, res) => {
  const mess = await Mess.findById(req.params.id);

  if (mess) {
    mess.date = req.body.date || mess.date;
    mess.day = req.body.day || mess.day;
    mess.rationused = req.body.rationused || mess.rationused;
    mess.foodwasted = req.body.foodwasted || mess.foodwasted;

    const updatedmess = await mess.save();
    res.json(updatedmess);

  } else {
    res.status(404);
    throw new Error("Mess detail not found");
  }
});

export { getMessbyId, getMesses, updateMess, deleteMess };