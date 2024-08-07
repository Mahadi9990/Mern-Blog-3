import { Table, TableHeadCell ,Modal ,Button, Alert} from 'flowbite-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { MdOutlineDoneOutline } from "react-icons/md";
import { HiMiniNoSymbol } from "react-icons/hi2";



export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user)
  const [users, setusers] = useState([]);
  const [showMore, setshowMore] = useState(true);
  const [showModle, setshowModle] = useState(false);
  const [userDelete, setuserDelete] = useState('');
  const [adminMessage, setadminMessage] = useState(false);
  useEffect(() => {
    const fetchApi = async() => {
      try {
        const res = await fetch(`/api/user/getUser`)
        const data = await res.json()
        if (res.ok) {
          setusers(data.users)
          if (data.users.length < 9) {
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
    const startIndex = users.length 
    try {
      const res =await fetch(`/api/user/getuser?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setusers((prev) => [...prev, ...data.users])
        if (data.users.length < 9) {
          setshowMore(false)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDeleteUser = async () => {
    setshowModle(false)
    try {
      const res = await fetch(`/api/user/delete/${userDelete}`, {
        method:'DELETE'
      })
      const data = await res.json()
      if (!res.ok) {
        setadminMessage(data.message)
      } else {
        setusers((prev)=> prev.filter((user)=> user._id !== userDelete))
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
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>UserName</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell><span>Delete</span></TableHeadCell>
            </Table.Head>
            {users.map((items) => (
              <Table.Body key={items._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(items.updatedAt).toLocaleTimeString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${items.slug}`}>
                      <img
                        src={items.avater}
                        alt={items.avater}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-slate-900 dark:text-white' to={`/posts/${items.slug}`}>
                      {items.email}
                      </Link>
                  </Table.Cell>
                  <Table.Cell>
                      {items.userName}
                  </Table.Cell>
                  <Table.Cell>
                      {items.isAdmin?<MdOutlineDoneOutline className='text-green-500' />:<HiMiniNoSymbol className='text-red-500'/>}

                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setshowModle(true)
                      setuserDelete(items._id)
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
        <p>No User founds</p>
      )}
      <Modal show={showModle} onClose={()=>setshowModle(false) } size='md' popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto '/>
            <h3 className='text-gray-600 dark:text-gray-400 mb-5 text-lg font-semibold'>Are you sure want to delete your Post</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={handleDeleteUser}>Yes,I'm sure</Button>
              <Button gradientDuoTone='purpleToPink' outline onClick={()=>setshowModle(false)}>No,Cancle</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
