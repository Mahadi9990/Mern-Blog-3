import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

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




export const singin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === '' || email === '') {
        next(errorHandler(201,'Fill up all fields'))
    }
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
             return next(errorHandler(402,'User is not founds'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
             return next(errorHandler(401,'Wroung password'))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JSONWEBTOKEN)
        const {password:pass,...rest}=validUser._doc
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (error) {
       next(error) 
    }
}
 
export const google = async (req, res, next) => {
    const {email,name,image} =req.body
    try {
        const userList = await User.findOne({ email })
        if (userList) {
            const token = jwt.sign({ id: userList._id }, process.env.JSONWEBTOKEN)
            const {password:pass,...rest} =userList._doc
            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
        } else {
            const generatePassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8)
            const hashPassword = bcryptjs.hashSync(generatePassword, 10)
            const newUser =new User({
                userName: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email: email,
                password: hashPassword,
                avater:image
            })
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, process.env.JSONWEBTOKEN)
            const {password:pass,...rest} =newUser._doc
            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error)
    }
}