import React from 'react';
import { useForm } from 'react-hook-form';
import {Input,Button,Select,RTE} from "../index"
import Service from '../../appwrite/config';
import {useNavigate} from 'react-router-dom';                                                                                            
import { useSelector,useDispatch } from 'react-redux';  
import { addpost,updatepost,removepost } from '../../store/postmanager';                                                                                                                                                                                                                                                                        
 
function Postform({post}){
    const {register,handleSubmit,watch,setValue,getValues,control}=useForm({
        defaultValues:{
        title:post?post.title:"",
        slug:post?post.slug:"",
        content:post?post.content:"",
        status:post?post.status:"active",
       
             
        }
    });
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userdata=useSelector((state)=>state.auth.userdata);
    // console.log(useSelector(state=>state.auth));
    // console.log(userdata);
    const submit=async(data)=>{
      /////updatation off post
        if(post){
           const file= data.image[0]?await Service.uploadfile(data.image[0]) :null
           if(file){
            if(post.featuredimage) await Service.deletefile(post.featuredimage);
           }
           const dbpost=await Service.updatepost(post.$id,{...data,featuredimage:file?file.$id:undefined})
             if(dbpost){
                dispatch(updatepost(dbpost));
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                   });
                navigate(`/post/${dbpost.$id}`);
             }
        }
        //create new post
        else{
           const file=data.image[0]?await Service.uploadfile(data.image[0]):null;
      
          if(file){
            // console.log(file);
            // console.log(file.$id);
            // console.log(userdata.$id);

           const newpost=await Service.createpost({...data,featuredimage:file.$id,userid:userdata.$id})
           if(newpost){
            dispatch(addpost(newpost));
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
               });
            navigate(`/post/${newpost.$id}`);
           }
        }}
    }
    const slugtransform=React.useCallback((value)=>{
        if(value&&typeof value==="string"){
           return  value
           .trim()
           .toLowerCase()
           .replace(/[^a-zA-Z\d]+/g,'-')
           .replace(/\s+/g, '-');
        }
        return "";
    },[])
    React.useEffect(()=>{
       const subscripirion=watch((value,{name})=>{
        if(name==="title"){
            setValue("slug",slugtransform(value.title,
                {
                    shouldValidate:true
                }
            ))
        }
       })
       return  ()=>subscripirion.unsubscribe();
       
    },[watch,slugtransform,setValue]
)
    

return (
  
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap [@media(max-width:700px)]:flex-col">
    <div className="w-2/3 px-2 [@media(max-width:700px)]:w-full">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        {/* {console.log(getValues("content"))} */}
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2 [@media(max-width:700px)]:w-full">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={Service.getfilepreview(post.featuredimage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bg={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>

)
}


export default Postform;


