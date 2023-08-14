import React from 'react'
import {useState, createContext} from 'react' ;
import { useNavigate } from 'react-router-dom';
import {baseUrl} from "../baseUrl"


export const AppContext = createContext() ; 

export default function AppContextProvider({children}) 
{
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const navigate = useNavigate() ; 


// FETCH DATA BLOS 
const fetchBlogPosts = async (page=1, tag=null, category) => 
{
    setLoading(true) ; 
    
    let url = `${baseUrl}?page=${page}` ; 

    // IF TAG IS AVILABE 
    if(tag)
    {
        url += `&tag=${tag}` ; 
        // console.log(url); 
    }

    // IF CATEGORY IS AVILABLE 
    if(category)
    {
        url += `&category=${category}` ; 
    }

    try
    {
        const result = await fetch(url) ; 
        const data = await result.json() ; 

        // console.log(data) ; 

        // AGAR DATA KE PASS POST NA HO TO 
        if(! data.posts || data.posts.length === 0)
            throw new Error("Someting Went Wrong") ; 

        setPage(data.page) ; 

        setPosts(data.posts) ; 
        // console.log( "Post" , data.posts) ; 

        setTotalPages(data.totalPages) ; 
        // console.log(data.totalPages) ; 
    }

    catch(error)
    {
        console.log("Error -> " , error) ; 
        setPage(1) ; 
        setPosts([]) ; 
        setTotalPages(null) ; 
    }

    setLoading(false) ; 
}


//  Handle When Next and Previous button are clicked
const handlePageChange = (page) => 
{
    // IS LINE SE URL MAI CHANGE HORA HAI 
    navigate({search: `?page=${page}`}) ;  // is line mai thora confusion hai . 
    setPage(page) ; 
}

const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };


  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
 
}
