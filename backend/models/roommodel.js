import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    roomno: {
      type: Number,
      required: true,
    },
    student1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
    student2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
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
