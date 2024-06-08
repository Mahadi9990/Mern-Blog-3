import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'

export const singup = async(req,res,next) => {
    const { userName, email, password } = req.body
    if (!userName || !email || !password || userName === "" || email === "" || password === "") {
       next(errorHandler(400,"Fill up all fields"))
    }
    const hashPassword =bcryptjs.hashSync(password,10)
    const newUser =new User({ userName, email, password:hashPassword })
    try {
        await newUser.save()
        res.status(200).json("User created successfully")
    } catch (error) {
        next(error)
    }
}