import express from 'express'
import { createComment,getComments } from '../controlars/Comment.js'
import { varifyToken } from '../utils/verifyToken.js'

const app =express.Router()

app.post('/create',varifyToken,createComment)
app.get('/getComment/:postId',getComments)

export default app;