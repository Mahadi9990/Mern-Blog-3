import express from 'express'
import { createPost ,getPosts, deletePost ,updatePost} from '../controlars/CreatePost.js'
import { varifyToken } from '../utils/verifyToken.js'

const router = express.Router()


router.post('/create-post',varifyToken, createPost)
router.get('/getposts', getPosts)
router.delete('/deletepost/:postId/:userId', varifyToken, deletePost)
router.put('/updatepost/:postId/:userId', varifyToken, updatePost)

export default router;