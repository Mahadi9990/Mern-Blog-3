import { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';

export default function Dashboard() {
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
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* DashSidebar */}
      <DashSidebar/>
      {/* DashProfile */}
      {tab === 'profile' && <DashProfile />}
      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      {/* Users */}
      {tab === 'users' && <DashUsers/>}
      {/* Comment */}
      {tab === 'comment' && <DashComment/>}
    </div>
  )
}
