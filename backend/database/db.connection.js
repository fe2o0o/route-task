import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.DATABASEURI).then(() => {
        console.log('db connected');
    }).catch((err) => {
        console.log('db erro '+err);
    })
}