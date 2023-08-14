import React, { useContext } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';



export default function () {

  const[blog , setBlogs] = useState(null) ; 
  const [relatedBlogs , setRelatedBlogs] = useState([]) ; 
  const location = useLocation() ; 
  const navigation = useNavigate() ; 
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";

  const {loading , setLoading} = useContext(AppContext) ; 


  // PATH KA LAST WALA HE BLOG ID HOGA 
  const blogId = location.pathname.split("/").at(-1) ;

  // console.log("Blog ID" , blogId) ; 
  
  async function fetchRelatedBlogs()
  {
    setLoading(true) ;
    let url =  `${newBaseUrl}get-blog?blogId=${blogId}` ; 

    // console.log(url) ; 

    try
    {
      const result = await fetch(url) ; 
      
      const data = await result.json() ; 

      // console.log(data) ; 

      setBlogs(data.blog) ; 
      setRelatedBlogs(data.relatedBlogs) ; 

      // console.log("Blog page hu " , data.relatedBlogs) ; 
    }

    catch(error)
    {
      console.log("Error is : " , error) ; 
      setBlogs(null) ; 
      setRelatedBlogs([]) ; 
    }

    setLoading(false) ; 
  }

  useEffect(() => {

      if(blogId)
      {
        fetchRelatedBlogs() ; 
      }
  }, [location.pathname])

  
  return (
    <div>

      <Header />

      {/* BACK BUTTON */}
      <div>
        <button onClick={() => navigation(-1)} className="border-2 border-gray-300  py-1 px-4 rounded-md mt-20">Back</button>
      </div>


      {/* BLOGS AND RELATE BLOGS */}
      {
        loading ? 
        (
          <div>
            <p>Loading</p>
          </div>
        ) : 
        blog ? 
        (
              <div className="w-11/12 max-w-[670px] min-h-screen py-8 flex flex-col gap-y-7 justify-center ">
              {/* FIRST VO BLOG JISE CALL KIYA HAI  */}
              <BlogDetails post = {blog}  />
                <h2 className="font-bold text-xl"> Related Blogs </h2>
              {/* RELATED BLOGS */}

              {
                  relatedBlogs.map((post) => (
                    <div key={post.id}>
                      <BlogDetails post={post} />
                    </div>
                  ))
              }
          </div>
        ) : 
        (
          <div>
            <p> No Blog Found </p>
          </div>
        )
      }

    </div>
  )
}
