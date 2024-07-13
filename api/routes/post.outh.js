import express from 'express'
import { createPost ,getPosts} from '../controlars/CreatePost.js'
import { varifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.post('/create-post',varifyToken, createPost)
router.get('/getposts', getPosts)

export default router;