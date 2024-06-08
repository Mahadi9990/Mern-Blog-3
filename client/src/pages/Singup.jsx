import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'

export default function Singup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex mx-auto p-3 max-w-3xl flex-col md:flex-row gap-4">
        <div className="left flex-1">
        <Link className="font-bold text-4xl dark:text-white">
          <span className="rounded-xl text-white py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Shafayat</span>
          Blog
        </Link>
        <p className='pt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid minima tempore magnam labore voluptate </p>
      </div>
        <div className="right flex flex-1 flex-col gap-4">
          <form action="">
            <div className=" flex flex-col gap-2">
            <Label value='Your name'/>
            <TextInput
              type='text'
              placeholder='user name'
              id='userName'
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label value='Your email'/>
            <TextInput
              type='email'
              placeholder='example@gmail.co '
              id='email'
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label value='Your password'/>
            <TextInput
              type='password'
              placeholder='user password'
              id='password'
            />
            </div>
            <Button className='w-full mt-3' gradientDuoTone='purpleToPink'>Sing up</Button>
          </form>
          <p className='font-semibold text-sm'>Have an account <Link to={'/sing-in'}><span className='text-blue-500 hover:underline'>Sing in</span></Link></p>
      </div>
      </div>
    </div>
  )
}
