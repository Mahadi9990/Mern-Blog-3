import { useEffect, useState } from "react";
import moment from 'moment'

export default function Comment({comment}) {
  const [users, setusers] = useState({});
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
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="">
        <img className="w-7 h-7 rounded-full" src={users.avater} alt={users.avater} />
      </div>
      <div className="">
        <div className="flex gap-2 items-center">
          <span className="text-blue-500">{`@${users.userName}`}</span>
          <span className="text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-md">{comment.comment}</p>
      </div>
    </div>
  )
}
