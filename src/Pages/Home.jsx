import React from 'react'
import Blogs from '../components/Blogs'
import Header from '../components/Header'
import Pagination from '../components/Pagination'


export default function Home() {
  return (

    <div>

        {/* HEADER  */}
        <Header />

        {/* BLOGS AND PAGINATION */}
        <div className="mt-20">
            <Blogs />
            <Pagination />
        </div>
      
    </div>
  )
}
