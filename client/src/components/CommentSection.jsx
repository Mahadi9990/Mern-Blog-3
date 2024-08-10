import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Alert, Button, Textarea} from 'flowbite-react'
import { useState } from 'react';

export default function CommentSection({postId}) {
    const {currentUser} =useSelector((state)=>state.user)
    const [comment, setcomment] = useState('');
    const [commentError, setcommentError] = useState(null);
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
            }
            setcommentError(data.message)
        } catch (error) {
            setcommentError(error)
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
    </div>
  )
}
