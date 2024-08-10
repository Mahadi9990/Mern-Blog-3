import express from 'express'
import { createComment } from '../controlars/Comment.js'
import { varifyToken } from '../utils/verifyToken.js'

const app =express.Router()

app.post('/create',varifyToken,createComment)

export default app