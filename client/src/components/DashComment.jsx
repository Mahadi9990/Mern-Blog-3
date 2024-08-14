import { Table, TableHeadCell ,Modal ,Button, Alert} from 'flowbite-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function Dashcomments() {
  const { currentUser } = useSelector((state) => state.user)
  const [comments, setcomments] = useState([]);
  const [showMore, setshowMore] = useState(true);
  const [showModle, setshowModle] = useState(false);
  const [commentDelete, setcommentDelete] = useState('');
  const [adminMessage, setadminMessage] = useState(false);
  useEffect(() => {
    const fetchApi = async() => {
      try {
        const res = await fetch(`/api/comment/getAllComments`)
        const data = await res.json()
        if (res.ok) {
          setcomments(data.comments)
          if (data.comments.length < 9) {
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
    const startIndex = comments.length 
    try {
      const res =await fetch(`/api/comment/getAllComments?commentId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setcomments((prev) => [...prev, ...data.comments])
        if (data.comments.length < 9) {
          setshowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDeletecomment = async () => {
    setshowModle(false)
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentDelete}`, {
        method:'DELETE'
      })
      const data = await res.json()
      if (!res.ok) {
        setadminMessage(data.message)
      } else {
        setcomments((prev)=> prev.filter((comment)=> comment._id !== commentDelete))
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-gray-300 dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500'>
        {adminMessage && (
             <Alert className='mt-5' color="failure">
            {adminMessage}
          </Alert>
         )}
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>UserId</TableHeadCell>
              <TableHeadCell>PostId</TableHeadCell>
              <TableHeadCell>comment</TableHeadCell>
              <TableHeadCell>Numbers Of Like</TableHeadCell>
              <TableHeadCell><span>Delete</span></TableHeadCell>
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
                      {items.comment}
                  </Table.Cell>
                  <Table.Cell>
                    {items.numberOfLike}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setshowModle(true)
                      setcommentDelete(items._id)
                    }} className='hover:underline font-medium text-red-500 cursor-pointer'>Delete</span>
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
        <p>No comment founds</p>
      )}
      <Modal show={showModle} onClose={()=>setshowModle(false) } size='md' popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto '/>
            <h3 className='text-gray-600 dark:text-gray-400 mb-5 text-lg font-semibold'>Are you sure want to delete your Post</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={handleDeletecomment}>Yes,I'm sure</Button>
              <Button gradientDuoTone='purpleToPink' outline onClick={()=>setshowModle(false)}>No,Cancle</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
