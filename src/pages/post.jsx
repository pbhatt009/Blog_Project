import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removepost } from "../store/postmanager"

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
       
    const userData = useSelector((state) => state.auth.userdata);
     const dispatch = useDispatch();
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getpost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");

    }, [slug, navigate]);
    // if(post) console.log("chexxk1",post.$id,slug);
    const deletePost = () => {
        appwriteService.deletepost(post.$id).then((status) => {
            if (status) {
                appwriteService.deletefile(post.featuredimage);
               dispatch(removepost(post.$id));
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
            <div className="w-1/2 md:w-2/3 sm:w-full mx-auto flex justify-center mb-4 relative border rounded-xl p-2">

                {/* <img src="https://cloud.appwrite.io/v1/storage/buckets/67ded83a000bf101df21/files/67ecb954003b4ef88381/view?project=67debe63002aac24fccd&mode=admin" alt="img loading" /> */}
                    <img 
                        src={appwriteService.getfilepreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl  "
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            {/* {console.log("post",post.$id)} */}
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}