import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Card({post}) {

  return (
    <div className="h-[480px]">
        <div className=" border-teal-500 p-2 group hover:h-[430px] h-[418px] w-[350px] position-relative overflow-hidden transition-all duration-300 border border-1 rounded-tl-none rounded-lg ">
            <div className="">
                <Link to={`/posts/${post.slug}`}>
                    <img className='h-[300px] duration-300 w-[350px] object-cover group-hover:h-[250px] transition-all' src={post.image} alt={post.image} />
                </Link>
            </div>
            <div>
                <p className='h-[55px] p-1 line-clamp-2 w-full'>{post.title}</p>
                <Button outline className="">{post.category}</Button>
                <button className="p-2 border-teal-500 border border-1 rounded-tl-none rounded-lg  w-full my-3"><Link  to={`/posts/${post.slug}`} className="mt-3 items-center">Read More</Link></button>
            </div>
        </div>
    </div>
  )
}
