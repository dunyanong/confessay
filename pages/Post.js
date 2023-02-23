import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { auth } from "../utils/firebase";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";

const Post = () => {
    //Form state
    const [post, setPost] = useState({ description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    //Submit Post
    const submitPost = async (e) => {
        e.preventDefault();
        //Run checks for description
        if (!post.description) {
            toast.error("no confessions written 😭", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        return;
        }
        if (post.description.length > 1000) {
            toast.error("description is too long 🤡", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        return;
        }

        if (post?.hasOwnProperty("id")) {
        const docRef = doc(db, "posts", post.id);
        const updatedPost = { ...post, timestamp: serverTimestamp() };
        await updateDoc(docRef, updatedPost);
        return route.push("/Frontpage");
        } else {
        //Make a new post
        const collectionRef = collection(db, "posts");
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        });
        setPost({ description: "" });
        toast.success("Post has been made 🚀", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
        return route.push("/Frontpage");

        }
    };

    //Check our user
    const checkUser = async () => {
        if (loading) return;
        if (!user) route.push("/auth/Login");
        if (routeData.id) {
        setPost({ description: routeData.description, id: routeData.id });
        }
    };

    useEffect(() => {
        checkUser();
    }, [user, loading]);

    return  (
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
        <Head>
          <title>Confessay</title>
        </Head>
        <div className="mt-2 my-10 md:my-10 py-12 md:p-12 border-solid rounded-lg max-w-xl mx-auto">
        <div className="text-center mb-8 ">
          <h1 className="text-2xl md:text-5xl font-bold mb-8">{post.hasOwnProperty("id") ? "Edit your confession" : "Confess Now!"}</h1>
            <p>
            Let's work together to create a safe and welcoming environment. By following these simple <Link href="/About" legacyBehavior><a className="text-blue-600">guidelines</a></Link>, we can ensure that everyone feels comfortable and respected.
            </p>
        </div>
        
        <form onSubmit={submitPost}>
          <div className="py-2">
            <input 
              type="text" 
              className="w-full border border-gray-300 p-2 rounded-lg my-2" 
              value={post.subject} 
              onChange={(e) => setPost({...post, subject: e.target.value})} 
              placeholder="Confession Subject 🙂" 
            />
          </div>
          <div className="py-2">
            <textarea 
              className="w-full border border-gray-300 p-2 rounded-lg my-2" 
              value={post.description} 
              onChange={(e) => setPost({...post, description: e.target.value})} 
              placeholder="Write your confession here 💬" 
              rows="8"
            />
          </div>
          <button 
            className="bg-black text-white py-2 px-4 rounded-lg my-2 hover:bg-gray-800" 
            type="submit"
          >
            {post.hasOwnProperty("id") ? "Update Confession" : "Post Confession"}
          </button>
        </form>
      </div>
  </div>
);
}
 
export default Post;
