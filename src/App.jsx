import { useState ,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login,logout} from "../src/store/authslice"
import authService from "../src/appwrite/auth"

import './App.css'
import { Outlet } from 'react-router-dom'
import { Header,Footer} from "../src/components/index"

function App() {
 const dispatch=useDispatch();
 const[loading,setLoading]=useState(true);
 useEffect(()=>{
    authService.getCurrentUser()
    .then((userdata)=>{
             if(userdata) dispatch(login(userdata))
             else  dispatch(logout())
    })
    .catch((err)=>console.log("App.jsx::useEffect::error:",err))
    .finally(
       ()=> setLoading(false)
    )
 },[])
 if(loading) return <>
 <div className=' flex justify-center items-center   text-amber-50 '>
  <h1>Loading...</h1>
  <p className="w-70 h-30 bg-amber-700 rounded-full animate-ping absolute "></p>

 </div>
 </>
  else return (
   <div className='min-h-screen flex flex-wrap content between bg-gray-400'>
<div className='w-full'>
<Header/>
<main>
<Outlet/>
</main>
<Footer/>
</div>

   </div>
  )
}

export default App
