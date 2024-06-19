import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
export default function DashSidebar() {
    const location = useLocation()
    const [tab, settab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromData = urlParams.get('tab')
        if (tabFromData) {
        settab(tabFromData)
        }
  },[location.search])
  return (
      <Sidebar className='w-full md:w-56' >
          <Sidebar.Items>
              <Sidebar.ItemGroup className='md:min-h-screen'>
                  <Link to={'/dashboard?tab=profile'} >
                    <Sidebar.Item as='div' active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'> 
                      Profile
                  </Sidebar.Item>
                  </Link>
                  <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'> 
                      Sing Out
                  </Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
    </Sidebar>
  )
}
