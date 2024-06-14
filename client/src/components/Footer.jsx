import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsDribbble, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className="w-full mx-auto max-w-7xl">
        <div className="grid w-full justify-between sm:flex md:grid-clos-2">
          <div className="">
          <Link className='
            self-center whitespace-nowrap text-sm md:text-lg font-semibold dark:text-white
            '>
            <span className='py-1 px-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>Shafayat</span>Blog
          </Link>
          </div>
          <div className=" grid grid-cols-2 gap-8 sm:grid-cols-3 mt-5">
            <div className="">
              <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://github.com/Mahadi9990'
                target='_blank'
                rel='noopender noreferrer'
              >
                100 js Project
              </Footer.Link>
              <Footer.Link
                href='/about'
                target='_blank'
                rel='noopender noreferrer'
              >
                About
              </Footer.Link>
              <Footer.Link
                href='/profile'
                target='_blank'
                rel='noopender noreferrer'
              >
                Profile
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Follow Us' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://github.com/Mahadi9990'
                target='_blank'
                rel='noopender noreferrer'
              >
                100 js Project
              </Footer.Link>
              <Footer.Link
                href='/about'
                target='_blank'
                rel='noopender noreferrer'
              >
                About
              </Footer.Link>
              <Footer.Link
                href='/profile'
                target='_blank'
                rel='noopender noreferrer'
              >
                Profile
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title='Contact' />
            <Footer.LinkGroup col>
              <Footer.Link
                href='https://github.com/Mahadi9990'
                target='_blank'
                rel='noopender noreferrer'
              >
                100 js Project
              </Footer.Link>
              <Footer.Link
                href='/about'
                target='_blank'
                rel='noopender noreferrer'
              >
                About
              </Footer.Link>
              <Footer.Link
                href='/profile'
                target='_blank'
                rel='noopender noreferrer'
              >
                Profile
              </Footer.Link>
            </Footer.LinkGroup>
            </div>
            
          </div>
        </div>
        <Footer.Divider />
        <div className="sm:justify-between sm:flex sm:items-center w-full">
          <div className="">
          <Footer.Copyright
            href='#'
            by="Shafayt's Blog"
            year={new Date().getFullYear()}
          />
        </div>
        <div className=" flex gap-6 sm:mt-0 mt-4 sm:justify-between">
          <Footer.Icon icon={BsFacebook}/>
          <Footer.Icon icon={BsInstagram} />
          <Footer.Icon icon={BsTwitter}/>
          <Footer.Icon icon={BsDribbble}/>
          <Footer.Icon icon={BsYoutube}/>
        </div>
        </div>
      </div>
    </Footer>
  )
}
