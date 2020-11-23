import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    roomno: {
      type: Number,
      required: true,
    },
    student1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
      required: true
    },
    student2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
      required: true
    },
    roomallocationyear: {
      type: Number,
      required: true,
    },
    roomvacatingyear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
