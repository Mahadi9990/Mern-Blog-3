import {useSelector} from 'react-redux'
import { Link,useNavigate} from 'react-router-dom'
import {Alert, Button, Modal, Textarea} from 'flowbite-react'
import { useEffect, useState } from 'react';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({postId}) {
    const {currentUser} =useSelector((state)=>state.user)
    const navigate =useNavigate()
    const [comment, setcomment] = useState('');
    const [commentError, setcommentError] = useState(null);
    const [showModle, setshowModle] = useState(false);
    const [commentToDelete, setcommentToDelete] = useState(null);
    const [allComments, setallComments] = useState([]);
    useEffect(() => {
        const fetchComments =async()=>{
            try {
                const res = await fetch(`/api/comment/getComment/${postId}`)
                if(res.ok){
                    const data = await res.json()
                    setallComments(data)
                }
            } catch (error) {
                console.log(error.message)
            }}
            fetchComments()  
    }, [postId]);

    const commentSubmit =async(e)=>{
        e.preventDefault()
        if(comment.length > 200){
            return
        }
        try {
            setcommentError(null)
            const res =await fetch('/api/comment/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({comment,postId,userId:currentUser._id})
            })
            const data =await res.json()
            if(res.ok){
                setcomment("")
                setcommentError(null)
                setallComments([data,...allComments])
            }
            setcommentError(data.message)
        } catch (error) {
            setcommentError(error)
        }
    }

    const handleLike =async(commentId)=>{
        try {
            if(!currentUser){
                navigate('/sing-in')
                return;
            }
            const res =await fetch(`/api/comment/likeComment/${commentId}`,{
                method:'PUT'
            })
            if(res.ok){
                const data =await res.json()
                setallComments(allComments.map((comment)=>
                    comment._id === commentId ?{
                        ...comment,
                        likes:data.likes,
                        numberOfLike:data.numberOfLike
                    }:comment
                ))
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleEdit =async(comment,editComment)=>{
        setallComments(allComments.map((c)=>
        c._id === comment._id ? {...c,comment:editComment}:c
        ))
    }
    const handleDeleteComment =async(commentId)=>{
        try {
            if(!currentUser){
                navigate('/sing-in')
                return;
            }
            const res =await fetch(`/api/comment/deleteComment/${commentId}`,{
                method:"DELETE"
            })
            if(res.ok){
                const data =await res.json()
                setallComments(allComments.filter((c)=>c._id !== commentId))
                setshowModle(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div>
        {currentUser ?(
            <div className="mx-auto flex flex-row gap-2 p-3 items-center">
                <p>Sing in as :</p>
                <img className='w-7 h-7 rounded-full' src={currentUser.avater} alt={currentUser.avater} />
                <Link className='hover:underline text-sm text-blue-500' to={'/dashboard?tab=profile'}>@{currentUser.userName}</Link>
            </div>
        ):(
            <p>Want to Commets <Link to={'/sing-in'} className='hover:underline text-blue-500 font-semibold'>sing in</Link></p>
        )}
        {currentUser && (
                <form onSubmit={commentSubmit} className='border-2 p-3 rounded-xl border-teal-500'>
                    <Textarea
                        placeholder='Add a comment...'
                        id='comment'
                        rows='3'
                        maxLength='200'
                        onChange={(e)=>setcomment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-between p-3 items-center">
                        <p className='text-gray-500 text-sm'>{200 - comment.length} Characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                            Submit
                        </Button>
                    </div>
                        {commentError && (
                            <Alert color='failure' className='mt-5'>
                                {commentError}
                            </Alert>
                        )}
                </form>
                
        )}

                { allComments.length === 0 ?(
                    <p className="">
                        No comment found
                    </p>
                ):(
                <>
                    <div className="flex items-center gap-2 mt-3">
                        <p>Comment :</p>
                        <div className="border rounded-sm py-1 px-2">
                            {allComments.length}
                        </div>
                    </div>
                    {
                        allComments.map(comment=>(
                            <div className="my-3">
                                <Comment
                                onDelete={(commentId)=>{
                                    setshowModle(true)
                                    setcommentToDelete(commentId)
                                }}
                                 onEdit={handleEdit} 
                                 onLike={handleLike}  
                                 key={comment._id} 
                                 comment={comment}
                                 />
                            </div>
                        ))   
                    }
                </>
                )}
        <Modal show={showModle} onClose={()=>setshowModle(false) } size='md' popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto '/>
            <h3 className='text-gray-600 dark:text-gray-400 mb-5 text-lg font-semibold'>Are you sure want to delete your account</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={()=>handleDeleteComment(commentToDelete)}>Yes,I'm sure</Button>
              <Button gradientDuoTone='purpleToPink' outline onClick={()=>setshowModle(false)}>No,Cancle</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
