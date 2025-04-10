import React from "react"
import { Link,useNavigate} from "react-router-dom"
import { Logo, Input, Button } from "./index"
import {login} from "../store/authslice"
import { useState } from "react"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
 function signup(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error,setError]=useState('');
    const {register,handleSubmit}=useForm();
    const create=async(data)=>{
        setError("");
        try{
          const session=  await authService.createAccount(data);
          if(session){
             const userdata= await authService.getCurrentUser() ;
              if(userdata) {dispatch(login(userdata));
              navigate("/")}
          }
        }
        catch(err){
          setError(err.message);
        }
    }
    return(
           <div
           className='flex items-center justify-center w-full'
           >
               <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
               <div className="mb-2 flex justify-center">
                           <span className="inline-block w-full max-w-[100px]">
                             <Logo width="100%" />
                           </span>
               </div>
               <h2 className="text-center text-2xl font-bold leading-tight">Create new account</h2>
               <p className="mt-2 text-center text-base text-white/60">
                           alredy have an account?&nbsp;
                           <Link
                               to="/login"
                               className="font-medium text-primary transition-all duration-200 hover:underline"
                           >
                               Log In
                           </Link>
               </p>
               {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

               <form onSubmit={handleSubmit(create)}>
                <div className="space-y-5">
                    <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register("name",{
                        required:true
                    })}
                    />
                 <Input label="Email" type="email" placeholder="Enter your email"{...register("email",{
                                        required:true,
                                        validate:{
                                            matchPattern:(value)=>
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                                   .test(value) || "Email address must be a valid address",
                                               }
                                    })} />
                    <Input  className='focus:bg-gray-500'label="Password" type="password" placeholder="Enter your password" {...register("password",{
                                        required:true,

                                    })} />
                       <Button type='submit' className='w-full'>
                                        Sign Up
                                    </Button>


                </div>
               </form>
               </div>
               </div>
    )
 }
 export default signup;
 