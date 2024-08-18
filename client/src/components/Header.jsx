import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { IoSearchSharp } from "react-icons/io5"
import { Link , useLocation,useNavigate } from 'react-router-dom'
import { FaMoon , FaSun } from "react-icons/fa6";
import { useSelector , useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { singoutUserFailuar , singoutUserSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


export default function Header() {
  const path = useLocation().pathname
  const dispatch =useDispatch()
  const location =useLocation()
  const navigate =useNavigate()
  const {currentUser} =useSelector((state)=>state.user)
  const { theme } = useSelector((state) => state.theme)
  const [ searchTerm , setsearchTerm ] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchQuary =urlParams.get('searchTerm')
    if(searchQuary){
      setsearchTerm(searchQuary)
    }
  }, [location.search]);
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
 const handelSubmit =(e)=>{
  e.preventDefault()
  const urlParams = new URLSearchParams(location.search)
  urlParams.set('searchTerm',searchTerm)
  const searchQuary =urlParams.toString()
  navigate(`/search?${searchQuary}`)

 }
  return (
      <Navbar className='border-b-2'>
          <Link className='
          self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white
          '>
            <span className='py-1 px-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Shafayat</span>Blog
          </Link>
          <form onSubmit={handelSubmit}>
              <TextInput
                  placeholder='Search...'
                  type='text'
                  rightIcon={IoSearchSharp}
                  className='hidden lg:inline'
                  value={searchTerm}
                  onChange={(e)=>setsearchTerm(e.target.value)}
              />
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <IoSearchSharp/>
      </Button>
          </form>
      <div className="flex md:order-2 gap-3">
        <Button className='w-12 h-10' pill color='gray' onClick={()=>dispatch(toggleTheme())}>
          {theme === 'light'?<FaSun/>:<FaMoon/>}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                size='sm'
                alt='user'
                img={currentUser.avater}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span>@{currentUser.email}</span><br />
              <span className='mt-2 truncate'>{currentUser.userName}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
            </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>
              <span onClick={userSingout}>
                Sing out
              </span>
            </Dropdown.Item>
          </Dropdown>
        ): (
          <Link to={'/sing-in'}>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sing in
          </Button>
        </Link>
        )}
        <Navbar.Toggle/>
      </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}>
            <Link to={'/'}>
              Home
            </Link>
          </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to={'/about'}>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/profile"} as={'div'}>
            <Link to={'/profile'}>
              Profile
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
  )
}
