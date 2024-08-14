import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Spinner } from 'flowbite-react'
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import Card from "../components/Card";


export default function PostPage() {
    const {postSlug} = useParams()
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);
    const [post, setpost] = useState([]);
    const [recentPost, setrecentPost] = useState([]);
    useEffect(() => {
        try {
            const recent3Post =async()=>{
                const res =await fetch(`/api/post/getposts?limit=3`)
                const data =await res.json()
                if(res.ok){
                    setrecentPost(data.posts)
                }
            }
            recent3Post() 
        } catch (error) {
          console.log(error.message)  
        }
    }, []);
    useEffect(() => {
     const fetchApi =async()=>{
        try {
            setloading(true)
            const res =await fetch(`/api/post/getPosts?slug=${postSlug}`)
            const data =await res.json()
            if(!res.ok){
                seterror(true)
                setloading(false)
                return;
            }else{
                seterror(false)
                setloading(false)
                setpost(data.posts[0])
            }
        } catch (error) {
            seterror(true)
            setloading(false)
        }
     } 
     fetchApi()
    }, [postSlug]);
    if(loading)return(
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>
    )
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post && post.title}
        </h1>
        <Link to={`/search?category=${post && post.category}`} className="self-center mt-3">
        <Button pill size='xs' color='gray' className="">
            {post && post.category}
        </Button>
        </Link>
        <img src={post && post.image} alt={post && post.image}  className="mt-3 p-3 object-cover max-h-[600px] w-full"/>
        <div className="flex justify-between p-3">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span>{post && (post.content.length/1000).toFixed(0)} min read</span>
        </div>
        <div dangerouslySetInnerHTML={{__html: post && post.content}}></div>
        <div className="max-w-4xl mx-auto w-full my-5">
            <CallToAction/>
        </div>
            <CommentSection postId={post._id}/>
        <div className="">
            <h1 className="text-center text-xl font-serif font-semibold">Recent Post</h1>
            <div className="flex flex-row gap-4 justify-center my-3">
                {recentPost && recentPost.map((post)=>
                        <Card key={post._id} post={post}/>
                )}
            </div>
        </div>
    </main>
  )
}
