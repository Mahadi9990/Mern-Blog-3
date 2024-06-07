import mongoose from "mongoose";

const userModle =new mongoose.Schema({
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
},{timestamps:true})

const User = mongoose.model('User', userModle)

export default User;