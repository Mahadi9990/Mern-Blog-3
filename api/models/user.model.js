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
        unique:true
    },
    password: {
        type: String,
        required: true,
    }, 
    avater: {
        type: String,
        default:"data:image/png;base64,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"
    },
    isAdmin: {
        type: Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('User', userModle)

export default User;