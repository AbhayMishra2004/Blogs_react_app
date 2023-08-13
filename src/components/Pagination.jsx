import React from 'react' ; 
import { useContext } from 'react' ; 
import {AppContext} from '../context/AppContext'

export default function Pagination() {

  const {page, handlePageChange, totalPages } = useContext(AppContext) ; 


  return (

    <div className="w-full flex justify-center items-center border-2  fixed bottom-0 bg-white">

    <div className="flex justify-between w-11/12 max-w-[670px] py-2 items-center">

    <div className="flex gap-x-2">

      {/* PREVIOUS BUTTON , HO FIRST PAGE MAIN NI DIKHEGA */}
        {
          page > 1 && 
        <button onClick={() => handlePageChange(page - 1)} className="rounded-md border-2 py-1 px-4"> Previous </button>
        }
      
      {/* NEXT WALA BUTTON , LAST PAGE MAI NI DIKHEGA */}
      {
        page < totalPages &&
            <button onClick={() => handlePageChange(page + 1)} className="rounded-md border-2 py-1 px-4"> Next </button>
      }
    
    </div>


      {/* SOW TOTAL PAGE AND CURRENT PAGE */}
      <p className="font-bold text-sm">
        page {page} of {totalPages}
      </p>
    
    </div>

    </div>
  )
}
