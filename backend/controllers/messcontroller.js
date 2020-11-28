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

export { getMessbyId, getMesses };