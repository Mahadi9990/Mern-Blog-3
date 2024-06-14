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
            next(errorHandler(202,'User is not founds'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            next(errorHandler(203,'Wroung password'))
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JSONWEBTOKEN)
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(validUser)
    } catch (error) {
       next(error) 
    }
 }