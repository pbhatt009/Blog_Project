import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authslice";
import { removeallposts } from "../../store/postmanager";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
function Logoutbtn(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        const lg=authService.logout()
        .then(()=> {
            dispatch(logout())
            dispatch(removeallposts())
            navigate("/")})
        .catch((err)=>console.log(err))
     
         }   
    return(
   <button className=' inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}
   >Logout</button>
    )
}
export default Logoutbtn;