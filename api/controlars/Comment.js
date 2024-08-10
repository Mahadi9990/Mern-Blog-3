import Comment from "../models/Comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComment =async(req,res,next)=>{
    try {
        const { comment,postId,userId } =req.body

        if(userId !== req.user.id){
            return next(errorHandler(400,'Your are not allowed to comments'))
        }
        const newComment =new Comment({
            userId,
            comment,
            postId
        })
        await newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
       next(error) 
    }
}

export const getComments =async(req,res,next)=>{
    try {
        const comments = await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

