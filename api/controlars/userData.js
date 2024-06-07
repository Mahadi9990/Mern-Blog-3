import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const singin = async(req,res) => {
    const { userName, email, password } = req.body
    if (!userName || !email || !password || userName === "" || email === "" || password === "") {
       return res.status(201).json("Fill up all fields")
    }
    const hashPassword =bcryptjs.hashSync(password,10)
    const newUser =new User({ userName, email, password:hashPassword })
    try {
        await newUser.save()
        res.status(200).json("User created successfully")
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}