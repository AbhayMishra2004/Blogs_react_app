import React from 'react'
import Blogs from '../components/Blogs'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TagPage() {

    // const navigation = Navigate() ; 
    const location = useLocation() ; 
    const tag =  location.pathname.split("/").at(-1) ;
    const navigation = useNavigate() ;  

    // console.log(tag) ; 
    // console.log(location) ; 


  return (

    <div>

      <Header />

      <div>
        <button onClick={() => navigation(-1)} className="border-2 border-gray-300  py-1 px-4 rounded-md mt-20"> back </button>

        <h2>
          Blog Tagged <span> #{tag} </span>
        </h2>

      </div>

      <div  className="mt-1">
        <Blogs />
        <Pagination />
      </div>



        
    </div>
  )
}
