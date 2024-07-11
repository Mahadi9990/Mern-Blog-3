import express from 'express'
import { createPost } from '../controlars/CreatePost.js'
import { varifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/create-post',varifyToken, createPost)

export default router;