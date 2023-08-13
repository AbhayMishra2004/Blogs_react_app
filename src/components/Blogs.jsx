import React , {useContext} from 'react'
import { AppContext } from '../context/AppContext'; 
import Spinner from './Spinner'
import "./Blogs.css" 


export default function Blogs() {

  // CONSUME OF THE DATA
  // LOADING AUR POSTS KO HUM LE RAHE HAI , APPCONTEXT SE 
  const { loading , posts } = useContext(AppContext); 

  // console.log(posts) ; 


  return (

    <div className="w-11/12 max-w-[670px] h-screen py-8 flex flex-col gap-y-7 mt-[260px] mb-[250px] justify-center items-center">
        { 
          // LOADING TRUE HO TO SPINNER DIKHA DO . 
          loading ? (<Spinner  />) :
          (
            // AGAR 0 POST DIKH RAHI HO TO 
            posts.length === 0 ?
             (<div> No Post Found</div>) : 

            //  OTHERWISE HAR POST KE CARD KO DIKHA DO 
            (posts.map((post) => 
            (
              <div key={post.id}>

                {/*   TITLE PADA HUA HAI */}
                <p className="font-bold text-lg">{post.title}</p>

                {/* AUTHOR KA NAAM PADA HUA HAI */}
                <p className="text-sm mt-[4px]"> 
                  by <span className="italic">{post.author}
                  </span> on  <span className="underline font-bold">{post.category}</span>
                </p>

                {/* POST DATE */}
                <p className="text-sm mt-[4px] ">
                  posted on {post.date}
                </p>

                {/* POST CONTENT */}
                <p className="text-md mt-[4px] ">
                  {post.content}
                </p>

                {/* # TAGS DIFFRENT DIFFRENT */}
                <div className="flex gap-x-3">
                  {
                    post.tags.map((tag , index) => {
                      return <span key={index} className="text-blue-700 underline font-bold text-xs mt-[5px] "> {`#${tag}`}</span>
                    })
                  }
                </div>

              </div>
            )
            ))
          )
        }
    </div>
  )
}
