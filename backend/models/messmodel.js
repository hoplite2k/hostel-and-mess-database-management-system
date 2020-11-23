import mongoose from 'mongoose';

const messSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    rationused: {
        type: Number,
        required: true,
        default: 0.0
    },
    foodwasted: {
        type: Number,
        required: true,
        default: 0.0
    }
},{
    timestamps: true
});

const Mess = mongoose.model('Mess', messSchema);

export default Mess;