import { Table, TableHeadCell ,Modal ,Button} from 'flowbite-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'


export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setuserPosts] = useState([]);
  const [showMore, setshowMore] = useState(true);
  const [showModle, setshowModle] = useState(false);
  const [postToDelete, setpostToDelete] = useState('');
  console.log(userPosts)
  useEffect(() => {
    const fetchApi = async() => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setuserPosts(data.posts)
          if (data.posts.length < 9) {
            setshowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.isAdmin) {
      fetchApi()
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    const startIndex = userPosts.length 
    try {
      const res =await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setuserPosts((prev) => [...prev, ...data.posts])
        if (data.posts.length < 9) {
          setshowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDeletePost = async () => {
    setshowModle(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postToDelete}/${currentUser._id}`, {
        method:'DELETE'
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        setuserPosts((prev)=> prev.filter((post)=> post._id !== postToDelete))
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-gray-300 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <TableHeadCell>Date Update</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell><span>Delete</span></TableHeadCell>
              <TableHeadCell><span>Edit</span></TableHeadCell>
            </Table.Head>
            {userPosts.map((items) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(items.updatedAt).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${items.slug}`}>
                      <img
                        src={items.image}
                        alt={items.image}
                        className='w-20 h-10 object-cover'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-slate-900 dark:text-white' to={`/posts/${items.slug}`}>
                      {items.title}
                      </Link>
                  </Table.Cell>
                  <Table.Cell>
                      {items.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setshowModle(true)
                      setpostToDelete(items._id)
                    }} className='hover:underline font-medium text-red-500 cursor-pointer'>Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update/${items._id}`}>
                    <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
             </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 text-sm py-7 self-center'>show more</button>
          )}
        </>
      ): (
        <p>No post founds</p>
      )}
      <Modal show={showModle} onClose={()=>setshowModle(false) } size='md' popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto '/>
            <h3 className='text-gray-600 dark:text-gray-400 mb-5 text-lg font-semibold'>Are you sure want to delete your Post</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={handleDeletePost}>Yes,I'm sure</Button>
              <Button gradientDuoTone='purpleToPink' outline onClick={()=>setshowModle(false)}>No,Cancle</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
