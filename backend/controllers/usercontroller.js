import asyncHandler from "express-async-handler";
import User from "../models/usermodel.js";
import generateToken from "../utils/generatetokens.js";

const authUser = asyncHandler (async (req, res) => {
    const { id, password } = req.body;

    const user = await User.findOne({id});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            id: user.id,
            isadmin: user.isadmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid ID or Password');
    }
});

const updateUserPassword = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        if(req.body.password){
            user.password = req.body.password
        }

        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            id: user.id,
            isadmin: user.isadmin,
            token: generateToken(user._id)
        });

    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id).populate('employeeid');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export { authUser, getUserProfile, updateUserPassword };