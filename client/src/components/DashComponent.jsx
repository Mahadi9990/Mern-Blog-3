import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { FaUserFriends } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { Button, Table,TableHeadCell } from "flowbite-react"
import { Link } from "react-router-dom";
import { MdOutlineDoneOutline } from "react-icons/md";
import { HiMiniNoSymbol } from "react-icons/hi2";



export default function DashComponent() {
  const {currentUser} =useSelector((state)=>state.user)
  const [comments, setcomments] = useState([]);
  const [posts, setposts] = useState([]);
  const [users, setusers] = useState([]);
  const [totalComments, settotalComments] = useState(0);
  const [totalPosts, settotalPosts] = useState(0);
  const [totalUsers, settotalUsers] = useState(0);
  const [lastMonthComments, setlastMonthComments] = useState(0);
  const [lastMonthPosts, setlastMonthPosts] = useState(0);
  const [lastMonthUsers, setlastMonthUsers] = useState(0);
  useEffect(() => {
    const fetchUsers =async()=>{
      try {
        const res =await fetch('/api/user/getUser?limit=5')
        const data =await res.json()
        if(res.ok){
          setusers(data.users)
          setlastMonthUsers(data.oneMonthBefore)
          settotalUsers(data.totalUser)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchPosts =async()=>{
      try {
        const res =await fetch('/api/post/getposts?limit=5')
        const data =await res.json()
        if(res.ok){
          setposts(data.posts)
          setlastMonthPosts(data.lastMonthPosts)
          settotalPosts(data.totalPosts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    const fetchComments =async()=>{
      try {
        const res =await fetch('/api/comment/getAllComments?limit=5')
        const data =await res.json()
        if(res.ok){
          setcomments(data.comments)
          setlastMonthComments(data.oneMonthBefore)
          settotalComments(data.totalComments)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if(currentUser.isAdmin){
      fetchUsers()
      fetchComments()
      fetchPosts()
    }
  }, [currentUser]);
  return (
    <div className="md:mx-auto">
      <div className="flex-wrap flex-col justify-center md:flex-row flex p-3 items-center gap-4">
        <div className="border-2 border-green-400 flex flex-col p-3 gap-2 md:w-72 w-full rounded-lg shadow-lg">
          <div className="flex flex-row justify-between items-center gap-4 p-3">
            <div className="">
              <h1 className="py-2 uppercase text-green-500 font-bold">Total User</h1>
              <p>{totalUsers}</p>
            </div>
            <FaUserFriends size='50px' className="bg-green-400 rounded-full p-3"/>
          </div>
          <div className="flex gap-1 flex-row items-center">
            <FaLongArrowAltUp color="green"/>
            <p className="text-xs">{lastMonthUsers}</p>
            <p className="text-xs">lastMonth</p>
          </div>
        </div>
        <div className="border-2 border-blue-400 flex flex-col p-3 gap-2 md:w-72 w-full rounded-lg shadow-lg">
          <div className="flex flex-row justify-between items-center gap-4 p-3">
            <div className="">
              <h1 className="py-2 uppercase text-blue-500 font-bold">Total post</h1>
              <p>{totalPosts}</p>
            </div>
            <MdOutlinePostAdd size='50px' className="bg-blue-400 rounded-full p-3"/>
          </div>
          <div className="flex gap-1 flex-row items-center">
            <FaLongArrowAltUp color="blue"/>
            <p className="text-xs">{lastMonthPosts}</p>
            <p className="text-xs">lastMonth</p>
          </div>
        </div>
        <div className="border-2 border-yellow-400 flex flex-col p-3 gap-2 md:w-72 w-full rounded-lg shadow-lg">
          <div className="flex flex-row justify-between items-center gap-4 p-3">
            <div className="">
              <h1 className="py-2 uppercase text-yellow-400 font-bold">Total comment</h1>
              <p>{totalComments}</p>
            </div>
            <FaRegComment size='50px' className="bg-yellow-400 rounded-full p-3"/>
          </div>
          <div className="flex gap-1 flex-row items-center">
            <FaLongArrowAltUp color="yellow"/>
            <p className="text-xs">{lastMonthComments}</p>
            <p className="text-xs">lastMonth</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-wrap gap-3">
        <div className="border-2 border-yellow-500 rounded-lg p-2 flex flex-col ">
          <div className="flex justify-between p-2 border-yellow-500 border-b-2 items-center">
            <h1 className="font-serif">Recent Users</h1>
            <Link to='/dashboard?tab=users'>
            <Button outline gradientDuoTone='purpleToPink'>See all</Button>
          </Link>
          </div>
        <Table hoverable className='shadow-md my-2'>
            <Table.Head>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>UserName</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
            </Table.Head>
            {users.map((items) => (
              <Table.Body key={items._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <Link to={`/dashboard?tab=profile`}>
                      <img
                        src={items.avater}
                        alt={items.avater}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                      {items.userName}
                  </Table.Cell>
                  <Table.Cell>
                      {items.email}
                  </Table.Cell>
                </Table.Row>
             </Table.Body>
            ))}
          </Table>
        </div>
        <div className="border-2 border-blue-500 rounded-lg p-2 flex flex-col ">
          <div className="flex justify-between p-2 border-blue-500 border-b-2 items-center">
            <h1 className="font-serif">Recent Posts</h1>
            <Link to='/dashboard?tab=posts'>
            <Button outline gradientDuoTone='purpleToPink'>See all</Button>
          </Link>
          </div>
        <Table hoverable className='shadow-md my-2'>
            <Table.Head>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>PostId</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
            </Table.Head>
            {posts.map((items) => (
              <Table.Body key={items._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(items.updatedAt).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/dashboard?tab=profile`}>
                      <img
                        src={items.image}
                        alt={items.image}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell >
                    {items._id}
                  </Table.Cell>
                  <Table.Cell className="p-3 line-clamp-1">
                    {items.title}
                  </Table.Cell>
                </Table.Row>
             </Table.Body>
            ))}
          </Table>
        </div>
        <div className="border-2 border-green-500 rounded-lg p-2 flex flex-col ">
          <div className="flex justify-between p-2 border-green-500 border-b-2 items-center">
            <h1 className="font-serif">Recent Comments</h1>
          <Link to='/dashboard?tab=users'>
            <Button outline gradientDuoTone='purpleToPink'>See all</Button>
          </Link>
          </div>
        <Table hoverable className='shadow-md my-2'>
            <Table.Head>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>UserId</TableHeadCell>
              <TableHeadCell>PostId</TableHeadCell>
              <TableHeadCell>number Of Like</TableHeadCell>
              <TableHeadCell>Comments</TableHeadCell>
            </Table.Head>
            {comments.map((items) => (
              <Table.Body key={items._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(items.updatedAt).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>
                    {items.userId}
                  </Table.Cell>
                  <Table.Cell>
                  {items.postId}
                  </Table.Cell>
                  <Table.Cell>
                  {items.numberOfLike}
                  </Table.Cell>
                  <Table.Cell>
                  {items.comment}
                  </Table.Cell>
                </Table.Row>
             </Table.Body>
            ))}
          </Table>
        </div>
      </div>
    </div>

  )
}
