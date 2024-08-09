import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="gap-4 flex flex-col sm:flex-row p-6 justify-center items-center border-teal-500 border rounded-none rounded-br-3xl rounded-tl-3xl">
        <div className='flex flex-col gap-4'>
            <h1 className='text-center'>Aim to make 100 projcet</h1>
            <p className='text-center'>Create first project to take lot of sempathy from my subcribers can you help me</p>
            <Button className='w-full rounded-none rounded-br-xl rounded-tl-xl' gradientDuoTone='purpleToPink'>100 js porject</Button>
        </div>
        <div className="">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1024,q_auto" alt="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1024,q_auto" />
        </div>
    </div>
  )
}
