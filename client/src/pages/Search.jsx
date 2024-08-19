import { Button, Select, TextInput }from 'flowbite-react'
import { useEffect, useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import Card from '../components/Card';

export default function Search() {
  const [posts, setposts] = useState([]);
  console.log()
  const [loading, setloading] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const location =useLocation()
  const navigate =useNavigate()
  const [searchBarData, setsearchBarData] = useState({
    searTerm:"",
    sort:"desc",
    category:"uncategorized"
  });
  useEffect(() => {
    const urlParams =new URLSearchParams(location.search)
    const searchTermQuery =urlParams.get('searchTerm')
    const sortQuery =urlParams.get('sort')
    const categoryQuery =urlParams.get('category')
    if(searchTermQuery || sortQuery || categoryQuery ){
      setsearchBarData({...searchBarData,
        searTerm:searchTermQuery,
        sort:sortQuery,
        category:categoryQuery
      })
    }

    const fetchApi =async()=>{
      setloading(true)
      const searchQuery =urlParams.toString()
      const res =await fetch(`/api/post/getposts?${searchQuery}`)
      if(!res.ok){
        setloading(false)
        return
      }
      if(res.ok){
        const data =await res.json()
        setloading(false)
        setposts(data.posts)
        if(data.posts.length === 9){
          setshowMore(true)
        }else{
          setshowMore(false)
        }
      }
      
    }
    fetchApi()
  }, [location.search]);

const handleChange =(e)=>{
  if(e.target.id === 'searchTerm'){
    setsearchBarData({...searchBarData,searTerm:e.target.value})
  }
  if(e.target.id === 'sort'){
    const order = e.target.value || 'desc'
    setsearchBarData({...searchBarData,sort:order})
  }
  if(e.target.id === 'category'){
    const category = e.target.value || 'uncategorized'
    setsearchBarData({...searchBarData,category})
  }
}

const handleSubmit =(e)=>{
  e.preventDefault()
  const urlParams =new URLSearchParams(location.search)
  urlParams.set('searchTerm',searchBarData.searTerm)
  urlParams.set('sort',searchBarData.sort)
  urlParams.set('cotegory',searchBarData.category)
  const searchQuery =urlParams.toString()
  navigate(`/search?${searchQuery}`)
}

const handleShowMore =async()=>{
  const numberOfPost =posts.length
  const startIndex =numberOfPost
  const urlParams =new URLSearchParams(location.search)
  urlParams.set('startIndex',startIndex)
  const searchQuery = urlParams.toString()
  const res =await fetch(`/api/post/getposts?${searchQuery}`)
  const data =await res.json()
  if(!res.ok){
    return
  }
  if(res.ok){
    setposts([...posts,...data.posts])
    if(data.posts.length === 9){
      setshowMore(true)
    }else{
      setshowMore(false)
    }
  }
}
  return (
    <div className='flex items-start gap-2 p-2'>
      <form onSubmit={handleSubmit} className=" w-[280px] p-3 border-l-4 border-teal-300 border-4 ">
        <div className="flex justify-start items-center gap-2 p-3">
          <label className='font-semibold'>SearchTerm:</label>
          <TextInput
            placeholder='Search...'
            type='text'
            id='searchTerm'
            value={searchBarData.searTerm}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row justify-start gap-2 items-center p-2">
          <label className='font-semibold'>Sort:</label>
          <Select onChange={handleChange} value={searchBarData.sort} id='sort'>
            <option value='asc'>Latest</option>
            <option value='desc'>Oldest</option>
          </Select>
        </div>
        <div className="flex flex-row justify-start gap-2 items-center p-2">
          <label className='font-semibold'>Category:</label>
          <Select onChange={handleChange} value={searchBarData.category} id='category'>
            <option value='uncategorized'>Uncategorized</option>
            <option value='javaScript'>JavaScript</option>
            <option value='wordPress'>WordPress</option>
            <option value='laravel'>Laravel</option>
            <option value='spotify'>Spotify</option>
          </Select>
        </div>
        <Button type='submit' gradientDuoTone='purpleToPink' className='w-full'>search</Button>
      </form>
      <div className="mx-auto flex flex-col">
        <h1 className='text-center'>Posts</h1>
        <div className="w-[920px] flex justify-center items-center gap-2 flex-wrap">
          {!loading && posts && posts.length > 0 && posts.map((post)=>
            <Card key={post._id} post={post}/>
          )}
        </div>
        {showMore && 
        (<button className='text-blue-600 font-semibold hover:underline p-3' onClick={handleShowMore}>showMore</button>)
        }
      </div>
    </div>
  )
}
