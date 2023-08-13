import {createContext, useState} from 'react' ; 
import {baseUrl} from "../baseUrl"

// STEP 1 ; 
// CREATE APP CONTEXT 
// EXPORT BECAUSE OTHER FILE MAI USE KARNA HAI 
export const AppContext = createContext() ; 


// CHILDREN BY DEFAULT USE HOGA 
export default function AppContextProvider({children})
{
    const[loading , setLoading] = useState(false) ; 
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);


    // DATA FEELING
    async function fetchBlogPosts(page = 1)
    {
        setLoading(true) ; 
        
        // URL MAI BASE URL AUR PAGE NUMBER 
        let url = `${baseUrl}?page=${page}` ; 

        try
        {
            const result = await fetch(url) ; 
            const data = await result.json() ; 

            // PAGE NUMBER KO SET KAR DO  
            setPage(data.page) ; 

            // POST KO BHI USKE HISAB SE SET KAR DO 
            setPosts(data.posts) ; 

            // TOTAL PAGES KO BHI SET KAR DO 
            setTotalPages(data.totalPages) ; 
        }

        catch(error)
        {
            console.log("Error in fethcing data") ; 

            // SABKO INITIAL STAGE MAI LE AAO 
            setPage(1) ; 
            setPosts([]) ; 
            setTotalPages(null) ; 
        }
        
        setLoading(false) ; 
    }


    // JAB PAGE CHANGE HOGA USKO HANDLE KARNE KE LIYE
    function handlePageChange(page)
    {
        // jo bhi page hai usko set kar do 
        setPage(page) ; 

        // USI KE LIYE DATA FETCH KARO 
        fetchBlogPosts(page) ; 
    }
    


    // JISKO HUME PASS KARNA HAI VO VALUE 
    const value = {loading , setLoading, posts, setPosts, page, setPage, totalPages, setTotalPages, fetchBlogPosts, handlePageChange } ; 


    // APPCONTEXT KE CHILDREN KO YAH VALUE RETURN KAR DO 
    // ISME APP CONTEXT KA CHILDREN APP HAI , ( INDEX.JS ) MAI DEKHNA 
    return <AppContext.Provider value = {value} > 
                {children}
        </AppContext.Provider>

}