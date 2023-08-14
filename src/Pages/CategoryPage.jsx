import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'  ; 
import Header from '../components/Header'
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';

export default function CategoryPage() {


    const navigation = useNavigate(); 
    const location = useLocation() ; 
    const category = location.pathname.split("/").at(-1) ; 

    // console.log("category Page : " , category) ; 


  return (

    <div>

        <Header />

        <div>
        <button onClick={() => navigation(-1)} className="border-2 border-gray-300 py-1 px-4 rounded-md mt-20"> back </button>

            <h2>
                Blog Tagged <span> #{category} </span>
            </h2>
        </div>

      <div className="mt-1">
            <Blogs />
            <Pagination />
        </div>
        
    
    </div>



  )
}
