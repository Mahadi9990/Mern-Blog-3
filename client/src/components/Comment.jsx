import { useEffect, useState } from "react";
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";


export default function Comment({comment,onLike,onEdit,onDelete}) {
  const {currentUser} =useSelector((state)=>state.user)
  const [users, setusers] = useState({});
  const [isEditing, setisEditing] = useState(false);
  const [editComment, seteditComment] = useState(comment.comment);
  console.log(users)
  useEffect(() => {
    const fetchUser =async()=>{
      try {
       const res =await fetch(`/api/user/${comment.userId}`)
       const data =await res.json()
       if(res.ok){
        setusers(data)
       }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [Comment]);
  const handleEdit =async ()=>{
    setisEditing(true)
    seteditComment(comment.comment)
  }
  const editCommentSave =async()=>{
    try {
      const res =await fetch(`/api/comment/editComment/${comment._id}`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          comment:editComment
        })
      })
      if(res.ok){
        setisEditing(false)
        onEdit(comment,editComment)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="">
        <img className="w-7 h-7 rounded-full" src={users.avater} alt={users.avater} />
      </div>
      <div className="">
        <div className="">
        <div className="flex gap-2 items-center">
          <span className="text-blue-500">{`@${users.userName}`}</span>
          <span className="text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        </div>
        {isEditing ?(
          <>
          <Textarea
             value={editComment}
             onChange={(e)=>seteditComment(e.target.value)}
          />
          <div className="flex justify-end gap-2 my-2">
            <Button type="button" onClick={editCommentSave} size='xs' gradientDuoTone='purpleToPink'>Save</Button>
            <Button type="button" onClick={()=>setisEditing(false)} size='xs' outline gradientDuoTone='purpleToPink'>Cencle</Button>
          </div>
          </>
        ):(
          <>
          <p className="text-md">{comment.comment}</p>
          <div className=" flex gap-2 my-2 h-2 items-center max-w-fit">
            <button type="button" onClick={()=>onLike(comment._id)}>
              <FaThumbsUp className={`text-sm text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}/>
            </button>
            <p className="text-gray-400">
              {comment.numberOfLike > 0 && comment.numberOfLike +" "+ (comment.numberOfLike === 1 ?'like':"likes")}
            </p>

            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) &&(
              <>
              <button
              type="button"
                className="text-gray-200 hover:text-blue-500 hover:underline"
                onClick={handleEdit}
                >Edit</button>
              <button
              type="button"
                className="text-gray-200 hover:text-red-700 font-semibold hover:underline"
                onClick={()=>onDelete(comment._id)}
                >Delete</button>
              </>
            )}
          </div>
          </>
        )}
      </div>
    </div>
  )
}
