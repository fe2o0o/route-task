
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    amount: {
        type: Number,
        min: 0,
        default:0
    },
    description: {
        type:String
    },
    date:Date
}, {
    timestamps:true
})

export const transactionModel = mongoose.model('transaction' , transactionSchema)