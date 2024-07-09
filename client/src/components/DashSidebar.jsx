import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { singoutUserFailuar,singoutUserSuccess } from '../redux/user/userSlice';
export default function DashSidebar() {
    const dispatch =useDispatch()
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
              <Sidebar.ItemGroup className='md:min-h-screen'>
                  <Link to={'/dashboard?tab=profile'} >
                    <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'> 
                      Profile
                  </Sidebar.Item>
                  </Link>
                  <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={userSingout}> 
                      Sing Out
                  </Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
    </Sidebar>
  )
}
