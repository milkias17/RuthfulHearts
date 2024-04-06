import React,{useEffect, useState} from 'react'
import Navigation from '../components/navigation'
import { Link, useParams } from 'react-router-dom'
import { client } from '../lib/sanity/client';
import PortableTextEditor from '../components/sanity/portableText';
import { urlForImage } from '../lib/utils';
import ShareBar from '../components/sharebar';

const Blog = () => {
  const params  = useParams()

  const [post, setPost] = useState([])
  const [count,setCount] = useState(0)



  useEffect(()=>{

    const postQuery = `*[_type == "post" && slug.current == $slug] {
      ...,
      author->,
      categories[]->,
      "audioUrl": audio.asset -> url 
    }
    [0]`

    client
    .fetch(postQuery, {slug:params.slug},{tag:'post'})
    .then(res => {
        console.log("Post info: ", res);
          setPost(res);
          
          // Here is when i tried to log the data but gets an error message.
      })
      .catch(err => {
        console.log(err);
      });

  },[params.slug])

  return (
    <>
      <Navigation/>
      <section className='z-20 flex px-1 md:px-12 lg:px-36 flex-col gap-4  items-center w-full min-h-screen'>
          <div className="post-header flex flex-col gap-2 w-[95%] border-b border-b-gray-800">
                <div className="image-container relative w-full">
                    <img className='object-cover h-[26rem]' src={post.mainImage && urlForImage(post.mainImage).url()} alt={post.title}/>
                </div>
                <div className=''>
                    <div className='flex justify-between items-center w-full'>
                        <Link to="/" className='text-sm text-gray-400 px-4'>return to home</Link>
                        <div className="author-avatar flex gap-2 h-fit items-center  " >
                            <img className='h-[2rem] w-[2rem] rounded-full border-2 border-stone-600 justify-end items-center' src={post.mainImage ? urlForImage(post.mainImage).url() : "fallback-image-url" }  alt='this is a test avatar'/>
                            <ul className="flex flex-col justify-center">
                              <li className='text-[10px] text-gray-400'>written by</li>
                              <li className='text-gray-200'>{post.author && post.author.name}</li>
                            </ul>
                        </div>
                    </div>
                    <h1 className="title text-start p-0 mt-1  text-4xl">{post.title}</h1>
                </div>

                <div className='flex w-full justify-start'>                    
                    <ShareBar post={post}/>               
                </div>
          </div>

          <div className="content px-6 flex flex-col gap-4 justify-center w-full">
                    <PortableTextEditor  body={post.body}/>
          </div>
           




            {/* <div className=" w-full px-2">
                <div className="imageContainer relative w-full h-[15rem] md:h-[20rem] lg:h-[25rem]">
                    <img className='object-cover' src={post.mainImage && urlForImage(post.mainImage).url()} alt={post.title}/>
                </div>
               < div className='post-header mt-12 flex '>
                <h1 className="title w-full  text-center p-0 m-0 ">{post.title}</h1>
                <Link to="/">return to home</Link>
            </div>

            </div>
            


            
           {/* this is a like dislike button  */}
                          
            {/* this is a like dislike button  */}
        
        
    </section>
    </>
  )
}

export default Blog