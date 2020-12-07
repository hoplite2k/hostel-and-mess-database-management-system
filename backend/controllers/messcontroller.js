import asyncHandler from "express-async-handler";
import Mess from "../models/messmodel.js";

const getallMesses = asyncHandler(async (req, res) => {
  const mess = await Mess.find({}).sort({ date: -1 });

  res.json(mess);
});

const getMesses = asyncHandler(async (req, res) => {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  const yearmonth = '' + year + '-' + month;
  const mess = await Mess.find({ date: { $regex: yearmonth } }).sort({ date: -1 });

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

const addMess = asyncHandler(async (req, res) => {
  if (req.body) {
    const mess = new Mess({
      user: req.user._id,
      date: req.body.date,
      day: req.body.day,
      rationused: req.body.rationused,
      foodwasted: req.body.foodwasted
    });
    const newmess = await mess.save();

    res.status(201).json(newmess);
  } else {
    res.status(400);
    throw new Error('Could not add mess details');
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

const searchMess = asyncHandler(async (req, res) => {
  if (req.body) {
    var dict = {};
    if (req.body.yearmonth) {
      const yearmonth = req.body.yearmonth; if (yearmonth !== '') {
        dict['date'] = { $regex: yearmonth };
      }
    }
    if (req.body.date) { const date = req.body.date; if (date !== '') { dict['date'] = date; } }
    if (req.body.day) { const day = req.body.day; if (day !== '') { dict['day'] = day; } }
    if (req.body.rationused) { const rationused = Number(req.body.rationused); if (req.body.rationused !== '') { dict['rationused'] = { $gte: rationused }; } }
    if (req.body.foodwasted) { const foodwasted = Number(req.body.foodwasted); if (req.body.foodwasted !== '') { dict['foodwasted'] = { $gte: foodwasted }; } }

    const mess = await Mess.find(dict).sort({ date: -1 });

    if (mess.length > 0)
      res.status(201).json(mess);
    else
      res.status(404).json('No mess detail found');
  } else {
    res.status(400);
    throw new Error('Could not find mess details');
  }
});

export { getMessbyId, getMesses, updateMess, deleteMess, addMess, searchMess, getallMesses };