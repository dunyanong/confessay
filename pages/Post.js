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
import { ToastContainer,toast } from 'react-toastify';
import { auth } from "../utils/firebase";
import Link from "next/link";

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
        return route.push("/");
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
        return route.push("/");

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
      <div>
        <div className="mt-2 my-10 md:my-10 p-12 border-solid rounded-lg max-w-3xl mx-auto">
        <div className="text-start mb-8 ">
          <h3 className="text-2xl font-bold font-medium">Rules</h3>
          <div>
            <p>
              Please follow these quick rules <Link href="/CreatorMessage" legacyBehavior><a className="text-cyan-700">here</a></Link>
            </p>
            <p className="text-red-600">Your accounts will be TERMINATED if you do not follow the rules.</p>
          </div>
        </div>
        
        <form onSubmit={submitPost}>
          <h1 className="text-2xl font-bold font-medium">
            {post.hasOwnProperty("id") ? "Edit your confession" : "Create a new confession"}
          </h1>
          <div className="py-2">
            <h3 className="text-lg font-medium font-bold">Subject</h3>
            <input 
              type="text" 
              className="w-full border border-gray-500 p-2 rounded-lg my-2" 
              value={post.subject} 
              onChange={(e) => setPost({...post, subject: e.target.value})} 
              placeholder="Confession Subject" 
            />
          </div>
          <div className="py-2">
            <h3 className="text-lg font-medium font-bold">Description</h3>
            <textarea 
              className="w-full border border-gray-500 p-2 rounded-lg my-2" 
              value={post.description} 
              onChange={(e) => setPost({...post, description: e.target.value})} 
              placeholder="Write your confession here..." 
              rows="8"
            />
          </div>
          <button 
            className="bg-cyan-500 text-white py-2 px-4 rounded-lg my-2 hover:bg-cyan-700" 
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
