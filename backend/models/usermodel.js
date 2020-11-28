import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    },
    employeeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
      },
},{
    timestamps: true
});

userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
};

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;