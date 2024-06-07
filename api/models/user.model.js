import mongoose from "mongoose";

const userModle = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        uniqued:true
    },
    password: {
        type: String,
        required: true,
    }
},{timeStamps:true})

const User = mongoose.model('User', userModle)

export default User;