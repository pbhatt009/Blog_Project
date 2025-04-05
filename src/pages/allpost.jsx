/////here all post means my all post
import React,{useState,useEffect}from 'react';
import { Postcard,Container } from '../components';
import service  from '../appwrite/config';
import { addallposts } from '../store/postmanager';
import { useDispatch,useSelector } from 'react-redux';
function Allpost(){
    const userdata=useSelector(state=>state.auth.userdata)
    const [posts,setposts]=useState([])
    const[flag,setflag]=useState(false);
    const dispatch=useDispatch();
    const postarr=useSelector(state=>state.postmanager.postarray)
    const [minepost,setminepost]=useState([])
      useEffect(()=>{
        if(userdata){
            if(postarr.length===0){
      service.getposts([])
     .then((res)=>{if(res){
         setposts(res.documents)
         setflag(true)
         dispatch(addallposts(res.documents))
        }
        })
     .catch((err)=>console.log(err))}
    else{
        setposts(postarr)
        setflag(true)
    }}
     else{
        setposts([])
          setflag(true)
     }
    },[userdata]);
    useEffect(()=>{
     if(userdata) {
        setminepost(posts.filter(post=>post.userid===userdata.$id))
      

     }
        
    },[posts])
 
    if(userdata){

     if(minepost.length===0) return (
        <div className='flex h-100 items-center justify-center'>

       { flag?<h1 className="text-2xl font-bold hover:text-gray-500 ">Upload your first post..</h1>:<h1 className="text-2xl font-bold hover:text-gray-500 ">Loading your Posts..</h1>}
    
    
    </div>
     )
 else  return(
  
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap'>
            {
               
                minepost.map((post)=>{
                    // { console.log(post)}
                     return(
                      
                    <div key={post.$id} className="
                         p-2 w-1/4
               [@media(max-width:500px)]:w-full  
           [@media(min-width:500px)]:w-1/2
           [@media(min-width:768px)]:w-1/3
           [@media(min-width:900px)]:w-1/4"
                    >
               
                        <Postcard {...post}/>
                        </div>
                    )
                })
            }
            
            </div>
                </Container>
        </div>
    )}
    else return(
        <div className='flex h-100 items-center justify-center'>

        <h1 className="text-2xl font-bold hover:text-gray-500 ">
             Lgin to see your posts..
      </h1>
      </div>
    )
}
export default Allpost;  