import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    roomno: {
      type: String,
      required: true,
    },
    inmates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }],
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
