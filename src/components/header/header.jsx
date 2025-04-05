import React,{useEffect} from "react";
import {Container,Logo,Logoutbtn} from "../index"
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function header(){
    // console.log("check")
    const authStatus=useSelector((state)=>state.auth.status)


     const navigate=useNavigate();
     const navitems=[
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "My Posts",
            slug: "/all-posts",
            active: true,
        },
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
    
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
     ];
    return(
       <header className="py-3 w-full shadow bg-gray-700 sticky top-0 z-50 overflow-auto " >
  <Container>
  <nav className="flex">
    <div className="mr-4 [@media(max-width:600px)]:hidden">
        <Link to="/">
        <Logo width="60px" height="50px" />
        </Link>
    </div>
    <ul className="flex ml-auto">
    {navitems.map((item) => 
            item.active ? (
              <li key={item.name}>
              <button
                onClick={() => {
                   window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                   });
                  navigate(item.slug)}}
                className="text-white font-semibold rounded-lg h-12 ml-1 text-base px-4 py-1 
                           [@media(max-width:540px)]:px-3 
                           [@media(max-width:540px)]:text-sm 
                           whitespace-nowrap"
              >
                {item.name}
              </button>
            </li>
            
              
            ) : null
            )}
         {}
        {
         authStatus && (
        <li className="ml-4 h-12 py-0.5">
        <Logoutbtn/>
        </li>
        )

        }
    </ul>
  </nav>

  </Container>
       </header>
    )
}
