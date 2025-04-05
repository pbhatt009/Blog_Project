import React ,{useDebugValue, useEffect,useState} from 'react';
import { Postcard,Container } from '../components';
import service from '../appwrite/config';
import { useSelector,useDispatch } from 'react-redux';
import { addpost,addallposts } from '../store/postmanager';

function Home(){
const [posts,setposts]=useState([])
  const dispatch=useDispatch();
  const status =useSelector((state)=>state.auth.status);
  const postsarr=useSelector((state)=>state.postmanager.postarray);


useEffect(()=>{
    // console.log(postsarr)
   // console.log("hi",posts);
//   /  console.log("status",status);
    if(status){
      if(postsarr.length===0){
   service.getposts([])
 .then((res)=>{if(res) {
    dispatch(addallposts(res.documents))
    setposts(res.documents);

 }})
 .catch((err)=>console.log(err))}
 else{
    setposts(postsarr);
 }

}
 else{
    setposts([]);
 }
},[status]);
return  (posts.length===0)?
(   <div className="w-full py-8 mt-4 text-center h-100 flex justify-center items-center">
    <Container>
        <div className="flex flex-wrap">
            <div className="p-2 w-full ">
             {(status)?<h1 className="text-2xl font-bold hover:text-gray-500 ">
                    No Posts yet..
                </h1>: <h1 className="text-2xl font-bold hover:text-gray-500 ">
                  Login to see posts..
                </h1>}

            </div>
        </div>
    </Container>
</div>):(
<div className="w-full py-8">
    <Container>
    <div className="flex flex-col [@media(min-width:500px)]:flex-row flex-wrap">
     {
                posts.map((post)=>{
                 return(
                    <div key={post.$id} 
                    className="p-2 w-1/4
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


)    


}
export default  Home
