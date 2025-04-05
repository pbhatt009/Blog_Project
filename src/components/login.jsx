import React from 'react'
import { Link,useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import {login as storelogin} from "../store/authslice"
import { useState } from 'react'
import {Logo,Logoutbtn,Input,Button} from "./index"
import { useDispatch,useSelector } from 'react-redux'
import {useForm } from 'react-hook-form'
export default function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const{register,handleSubmit}=useForm();
    const[error,setError]=useState('');
    const Login= async (data)=>{
      setError('');
      try{
        const session=  await authService.login(data);
        if(session){
           const userdata=await authService.getCurrentUser() ;
            console.log(userdata);
           if(userdata) dispatch(storelogin(userdata));
             console.log(useSelector(state=>state.auth.userdata));
            navigate("/")
        }
        }
        catch(err){
          setError(err.message);
        }
    }
    
return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-700 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                      <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-white/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form
        onSubmit={handleSubmit(Login)}
        className='mt-8'
        >
            <div className="space-y-5">
                <Input label="Email" type="email" placeholder="Enter your email"{...register("email",{
                    required:true,
                    validate:{
                        matchPattern:(value)=>
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                               .test(value) || "Email address must be a valid address",
                           }
                })} />
                <Input label="Password" className="focus:bg-gray-500" type="password" placeholder="Enter your password" {...register("password",{
                    required:true,
                    
                })} />
                     <Button type='submit' className='w-full'>
                                                        LogIn
                                                    </Button>
                 
                
                </div>

        </form>
       </div>
       </div> 
)
}