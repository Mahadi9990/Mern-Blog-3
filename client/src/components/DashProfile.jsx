import { useSelector } from 'react-redux'
import {Button, TextInput} from 'flowbite-react'

export default function DashProfile() {
    const {currentUser} = useSelector((state)=>state.user)
  return (
      <div className='mx-auto'>
          <h1 className='text-center p-4 font-bold'>Profile</h1>
          <form className='flex flex-col gap-3 md:w-[500px] w-[300px]'>
              <div className=" w-32 h-32 self-center cursor-pointer">
                    <img src={currentUser.avater} className='rounded-full w-full h-full border-8 border-[lightgray]' alt="" />
              </div>
        <TextInput
          className='w-full'
          type='text'
          id='userName'
          placeholder='User name'
          defaultValue={currentUser.userName}
        />
        <TextInput
          type='eamil'
          id='eamil'
          placeholder='example@gmail.com'
          defaultValue={currentUser.email}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
        />
        <Button gradientDuoTone='purpleToBlue' outline type='submit'>
          Update
        </Button>
      </form>
      <div className="flex justify-between pt-2">
        <span className='text-red-600 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-400 font-semibold cursor-pointer'>Sing Out</span>
      </div>
    </div>
  )
}
