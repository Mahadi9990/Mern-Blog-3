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
        const token = jwt.sign({ id: validUser._id , isAdmin:validUser.isAdmin }, process.env.JSONWEBTOKEN)
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
            const token = jwt.sign({ id: userList._id ,isAdmin:userList.isAdmin}, process.env.JSONWEBTOKEN)
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
            const token = jwt.sign({ id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JSONWEBTOKEN)
            const {password:pass,...rest} =newUser._doc
            res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
        }
    } catch (error) {
        next(error)
    }
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(402,'You can updata your own account'))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(402, 'Password must be 7 character'))
        }
        req.body.password =bcryptjs.hashSync(req.body.password,10)

    }
    if (req.body.userName) {
        if (req.body.userName.length < 5 || req.body.userName.length > 20) {
            return next(errorHandler(400, 'Username must between 5 and 21 character'))
        }
        if (req.body.userName.includes(' ')) {
            return next(errorHandler(400, 'Space is not allowed'))
        }
        if (req.body.userName  !== req.body.userName.toLowerCase()) {
            return next(errorHandler(400, 'Username must be LowerCase'))
        }
        if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username must be text or number'))
        }
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    avater:req.body.avater
                },
            },
            { new: true }
        )
        const { password:pass,...rest } =updateUser._doc
        res.status(200).json(rest)

    } catch (error) {
      next(error)  
    }
}


export const deleteUser = async (req, res, next) => {

    if (req.user.isAdmin && req.user.id  === req.params.userId) {
        
        return next(errorHandler(404,'Log Admin account is not for delete'))
    }
    if (!req.user.isAdmin && req.user.id  !== req.params.userId) {
        return next(errorHandler(404,'You can delete your own account'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('user has beed deleted')
    } catch (error) {
      next(error)  
    }
}
export const singOutUser = async (req, res, next) => {
   
    try {
        res
            .clearCookie('access_token')
            .status(201)
            .json('user has been singout')
    } catch (error) {
      next(error)  
    }
}

export const getUser = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(401,'Only admin can see all users'))
    }
    try {
        const startIndex = req.query.startIndex || 0;
        const limit = req.query.limit || 9;
        const sortDirection =req.query.sort === 'asc' ? 1 : -1
        const users = await User.find()  
            .sort({ createdAt: sortDirection })
            .limit(limit)
            .skip(startIndex)
        
        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest
        })

        const totalUser = await User.countDocuments()
        
        const now = new Date()
        
        const lestMonth = new Date(
            now.getFullYear() /
            now.getMonth() - 1 /
            now.getTime()
        )

        const oneMonthBefore = await User.countDocuments({
            createdAt : { $gte :lestMonth}
        })

        res.status(200).json({
            users: userWithoutPassword,
            oneMonthBefore,
            totalUser
        })
    } catch (error) {
        next(error)
    }
 }

