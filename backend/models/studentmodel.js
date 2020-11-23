import mongoose from "mongoose";

const parentSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    usn: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
      default: 1,
    },
    roomno: {
      type: String,
      required: true,
    },
    roomatename: {
      type: String,
      required: false,
      unique: true,
    },
    roomateusn: {
      type: String,
      required: false,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    idproof: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    feespaid: {
      type: Number,
      required: true,
      default: 25000.0,
    },
    feesdue: {
      type: Number,
      required: true,
      default: 0.0,
    },
    penalties: {
      type: Number,
      required: true,
      default: 0.0,
    },
    firstyear: {
      type: Number,
      required: true,
    },
    finalyear: {
      type: Number,
      required: true,
    },
    bloodgrp: {
      type: String,
      required: true,
    },
    parents: parentSchema,
    ispassedout: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
