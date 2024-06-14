import { Button, Navbar, TextInput } from 'flowbite-react'
import { IoSearchSharp } from "react-icons/io5"
import { Link ,useLocation } from 'react-router-dom'
import { FaMoon } from "react-icons/fa6";

export default function Header() {
  const path =useLocation().pathname
  return (
      <Navbar className='border-b-2'>
          <Link className='
          self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white
          '>
            <span className='py-1 px-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Shafayat</span>Blog
          </Link>
          <form>
              <TextInput
                  placeholder='Search...'
                  type='text'
                  rightIcon={IoSearchSharp}
                  className='hidden lg:inline'
              />
          </form>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <IoSearchSharp/>
      </Button>
      <div className="flex md:order-2 gap-3">
        <Button className='w-12 h-10' pill color='gray'>
          <FaMoon/>
        </Button>
        <Link>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sing in
          </Button>
        </Link>
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
