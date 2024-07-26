import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        min: [3, "name is too short "],
        max: [40, "name must be less than 40 chracters"],
        trim:true
    },
    email: {
        type: String,
        required: [true, "email is rquired"],
        trim:true
    },
    password: {
        type: String,
        required: [true, "password is rquired"],
        trim: true
    },
    transactions: [{ type: mongoose.Types.ObjectId, ref:'transaction'}],
    role: {
        type: String,
        enum:['user' , 'admin']
    }
}, {
    timestamps:true
})


export const userModel = mongoose.model('user' , userSchema )