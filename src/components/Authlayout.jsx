import React,{useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function authlayout({children,Authentication=true}){
const navigate=useNavigate()
const [loading,setloading]=useState(true)
const status=useSelector((state)=>state.auth.status);
 useEffect(()=>{
    if(Authentication&&status!==Authentication){
        navigate("/login")
    }
    else if(!Authentication&&status!==Authentication){
        navigate("/")
    }
    else setloading(false)
 },[status,navigate,Authentication])

return loading ? <h1>loading...</h1> : <>{children}</>
    

}