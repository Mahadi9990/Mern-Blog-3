import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { IoDocuments } from "react-icons/io5";

import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { singoutUserFailuar,singoutUserSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';
import { FaUsers } from "react-icons/fa";

export default function DashSidebar() {
  const dispatch = useDispatch()
  const {currentUser} =useSelector((state)=>state.user)
    const location = useLocation()
    const [tab, settab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromData = urlParams.get('tab')
        if (tabFromData) {
        settab(tabFromData)
        }
    }, [location.search])
     const userSingout = async () => {
    try {
      const res = await fetch(`/api/user/singout`, {
        method:'POST'
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(singoutUserFailuar(data.message))
      } else {
        dispatch(singoutUserSuccess(data))
      }
    } catch (error) {
      dispatch(singoutUserFailuar(error.message))
    }
}
  
  return (
      <Sidebar className='w-full md:w-56' >
          <Sidebar.Items>
              <Sidebar.ItemGroup className='md:min-h-screen flex flex-col gap-1'>
                  <Link to={'/dashboard?tab=profile'} >
                  <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'user'}>
                    Profile
                  </Sidebar.Item>
                  </Link>
                  {currentUser.isAdmin && (
                 <Link to={'/dashboard?tab=posts'} >
                    <Sidebar.Item as='div' active={tab === 'posts'} icon={IoDocuments}  labelColor='dark'> 
                      Posts
                  </Sidebar.Item>
                  </Link>
                  )}
                  {currentUser.isAdmin && (
                 <Link to={'/dashboard?tab=users'} >
                    <Sidebar.Item as='div' active={tab === 'users'} icon={FaUsers}  labelColor='dark'> 
                      Users
                  </Sidebar.Item>
                  </Link>
                  )}
                  <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={userSingout}> 
                      Sing Out
                  </Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
    </Sidebar>
  )
}
