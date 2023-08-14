import React from 'react'
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import { Route, Routes, useSearchParams , useLocation} from "react-router-dom";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import BlogPage from "./Pages/BlogPage";
import "./App.css" ; 


export default function App() {


  // FETCH FROM THE APP CONTEXT
  const {fetchBlogPosts} = useContext(AppContext) ; 

  // CURRENT URL KE PARAMETER KE OPTION KO 
  const[searchParams, setSearchParams] = useSearchParams() ; 

  // CURRENT URL KI COMPLETE INFO RAKHTA HAI 
  const location = useLocation();

  
  
  useEffect(() => {

    // PAGE KO SEARCH KAREGA OTHER WISE 1 SET KAR DEGA . 
    const page = searchParams.get("page") ?? 1 ; 

    // AGAR TAGS WALA SEARCH HO URL MAI TO 
    if(location.pathname.includes("tags"))
    {
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      console.log("Tags" , tag) ; 
      fetchBlogPosts(Number(page), tag);
    }

    // AGAR CATEGORIES WALA SEARCH HO URL MAI TO 
    else if(location.pathname.includes("categories"))
    {
      const categories = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null ,  categories);
      console.log("App : " , categories) ; 
    }

    // OTHER WISE HUMBE SIRF PAGE KO SEARCH KARNA HAI 
    else
    {
      fetchBlogPosts(Number(page)) ; 
    }
  
  // LOCATION.SEARCH FOR ? KE PICHE WALE PART KE LIYE 
  // location.pathname , Base URL ke badd ka path 
  }, [location.pathname, location.search]) 


  return (

    <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">

    <Routes>

      {/* YAHA HOME KI FILE  */}
      <Route path="/" element={<Home />} />


      {/* TAG PAGE  */}
      <Route path="/tags/:tag" element={<TagPage />} /> 

      {/* CARTEFORY PAGE */}
      <Route path="/categories/:category" element={<CategoryPage />} /> 

      {/* GOING TO BLOG PAGE */}
       <Route path="/blog/:blog" element={<BlogPage />} /> 

    </Routes>

    </div>


  )
}
