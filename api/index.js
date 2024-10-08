import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userOuth from './routes/user.outh.js'
import postOuth from './routes/post.outh.js'
import commentOuth from './routes/comment.outh.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connect with Mongoose')
}).catch((err) => {
    console.log(err)
})

const __dirname =path.resolve()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userOuth)
app.use('/api/post', postOuth)
app.use('/api/comment', commentOuth)
app.use(express.static(path.join(__dirname,"/client/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})
app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})