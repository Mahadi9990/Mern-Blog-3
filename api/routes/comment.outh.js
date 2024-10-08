import express from 'express'
import { createComment,getComments,likeComments,editComments,deleteComments,getAllComments} from '../controlars/Comment.js'
import { varifyToken } from '../utils/verifyToken.js'

const app =express.Router()

app.post('/create',varifyToken,createComment)
app.get('/getComment/:postId',getComments)
app.put('/likeComment/:commentId',varifyToken,likeComments)
app.put('/editComment/:commentId',varifyToken,editComments)
app.delete('/deleteComment/:commentId',varifyToken,deleteComments)
app.get('/getAllComments',varifyToken,getAllComments)

export default app;