import { Link , useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react';
import Outh from '../components/Outh';

export default function Singup() {
  const [formData, setformData] = useState({});
  const [errorMessage, seterrorMessage] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate =useNavigate()
  const handleClick = (e) => {
    setformData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.userName || !formData.email || !formData.password) {
      return seterrorMessage("Please fill up add inputs")
    }
    try {
      setloading(true)
      seterrorMessage(null)
      const res = await fetch('/api/user/sing-up', {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json()
      
      if (data.success === false) {
        seterrorMessage(data.message)
        setloading(false)
        return
      }
      setloading(false)
      navigate('/sing-in')
      
    } catch (error) {
      seterrorMessage(error.message)
      setloading(false)
    }
  }
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
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col gap-2">
            <Label value='Your name'/>
            <TextInput
              type='text'
              placeholder='user name'
                id='userName'
                onChange={handleClick}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label value='Your email'/>
            <TextInput
              type='email'
              placeholder='example@gmail.com'
                id='email'
                onChange={handleClick}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label value='Your password'/>
            <TextInput
              type='password'
                id='password'
                placeholder='***********'
                onChange={handleClick}

            />
            </div>
            <Button type='submit' disabled={loading} className='w-full mt-3' gradientDuoTone='purpleToPink'>
              {loading ? 
                (<>
                <Spinner size='sm' /><span className='pl-3'>Loading...</span>
                </>)
             : 'Sing up'}
            </Button>
            <Outh/>
          </form>
          <p className='font-semibold text-sm'>Have an account <Link to={'/sing-in'}><span className='text-blue-500 hover:underline'>Sing in</span></Link></p>
          {errorMessage && (
             <Alert className='mt-5' color="failure">
            {errorMessage}
          </Alert>
         )}
      </div>
      </div>
    </div>
  )
}
