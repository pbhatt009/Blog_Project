import React from 'react'
import awService from '../appwrite/config'
import { Link } from 'react-router-dom'
function Postcard({$id,title,featuredimage}) {
    //  console.log(featuredimage);
    // console.log(awService.getfilepreview(featuredimage));
    // console.log("hii",awService.getfilepreview(featuredimage))
return(
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
               
                <img src={awService.getfilepreview(featuredimage)} alt={title} className='rounded-xl'/>
                {/* <img src="https://cloud.appwrite.io/v1/storage/buckets/67ded83a000bf101df21/files/67ecb954003b4ef88381/view?project=67debe63002aac24fccd&mode=admin" alt="img loading" /> */}

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
)
}
export default Postcard;