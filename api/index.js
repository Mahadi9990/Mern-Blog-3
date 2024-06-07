import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userOuth from './routes/user.outh.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connect with Mongoose')
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())

app.use('/api/user',userOuth)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})