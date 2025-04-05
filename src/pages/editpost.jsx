import React,{useState,useEffect} from 'react';
import { Postform,Container } from '../components';
import { useNavigate,useParams} from 'react-router-dom';
import service from '../appwrite/config';


function Editpost(){
    const {slug}=useParams();
    // console.log("edithi",slug)
    const [post,setpost]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
           if(slug){
            service.getpost(slug)
            .then((post)=>{
            if(post){
                // console.log("post detail",post)
                setpost(post)
            }
            })
            .catch((err)=>console.log(err))}
            else   navigate('/')
    
    },[slug,navigate])
   
    return post?(
       <div className='py-8'>
            <Container>
        <Postform post={post}/>
        </Container>
        </div>
    ):null}
        export default Editpost;
