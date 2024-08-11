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
export const likeComments =async(req,res,next)=>{
    try {
      const comment =await Comment.findById(req.params.commentId)  
      if(!comment){
        return next(errorHandler(400,"Comment is not found"))
      }
      const userIndex =comment.likes.indexOf(req.user.id)
      if(userIndex === -1){
        comment.numberOfLike +=1
        comment.likes.push(req.user.id)
      }else{
        comment.numberOfLike -=1
        comment.likes.splice(userIndex,1)
      }
      await comment.save()
      res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}


export const editComments =async(req,res,next)=>{
try {
    const comment =await Comment.findById(req.params.commentId)  
    if(!comment){
      return next(errorHandler(400,"Comment is not found"))
    }
    if(comment.userId !== req.user.id && !req.user.isAdmin){
        return next(errorHandler(400,'Your are not allowed to edit this comment'))
    }
    const editComment =await Comment.findByIdAndUpdate(req.params.commentId,{
        comment:req.body.comment
    },{
        new:true
    })
    res.status(200).json(editComment)
} catch (error) {
    next(error)
}
}