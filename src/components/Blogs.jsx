import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";

export default function Blogs() {
    
    const { posts, loading } = useContext(AppContext);

    // console.log("Post By Blog", posts) ; 

    return (
        <div className="w-11/12 max-w-[670px] min-h-screen py-8 flex flex-col gap-y-7 justify-center items-center">

            {/* LOADING AGAR TRUE HO TO  */}
            {loading ? (
                <div className="min-h-[80vh] w-full flex justify-center items-center">
                    <p className="text-center font-bold text-3xl">Loading</p>
                </div>

            // AGAR POST HE NA MILE TO 
            ) : posts.length === 0 ? (
                <div className="min-h-[80vh] w-full flex justify-center items-center">
                    <p className="text-center font-bold text-3xl">No Blogs Found !</p>
                </div>
            ) : (

                // JITNI POST MILIT UNKE CARD 
                posts.map((post) => (
                    <BlogDetails key={post.id} post={post} />
                ))
            )}
        </div>
    );
}
