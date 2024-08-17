import {Link} from 'react-router-dom'
import {Button} from 'flowbite-react'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import Card from '../components/Card';
export default function Home() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchApi =async()=>{
      const res =await fetch('/api/post/getposts')
      const data =await res.json()
      if(res.ok){
        setposts(data.posts)
      }
    }
    fetchApi()
  }, []);
  return (
    <div className='mx-auto flex flex-col justify-center items-center p-3'>
      <div className="w-[800px] ">
        <h1 className='text-4xl font-serif font-bold p-28'>Welcome to ours Page</h1>
        <p className='my-5 font-serif'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime temporibus facilis cupiditate! Veritatis, dolorem? Itaque aliquid consequatur quam et soluta.</p>
        <Link to='/search'><Button gradientDuoTone='purpleToBlue' outline>View all Posts</Button></Link>
      </div>
      <div className="mx-auto my-5 p-3">
        <CallToAction/>
      </div>
      <div className="m-5 mx-auto">
        <h1 className='text-center text-3xl font-bold my-4'>Recent Posts</h1>
        <div className="flex flex-row flex-wrap gap-6 justify-center">
          {posts.length > 0 && posts.map((item)=>(
            <Card key={item._id} post={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}
