import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

export default function CommentSection({postId}) {
    const {currentUser} =useSelector((state)=>state.user)
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
    </div>
  )
}
