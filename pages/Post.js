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
import { FullScreenNavbar } from "../components/FullScreenNavbar";
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
        if (post.description.length > 800) {
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
        if (!user) route.push("/auth/login");
        if (routeData.id) {
        setPost({ description: routeData.description, id: routeData.id });
        }
    };

    useEffect(() => {
        checkUser();
    }, [user, loading]);

    return  (
      <div>
        <nav className="py-10 mb-12 flex justify-between items-center ">
            <ul className="flex">
            <li>
            <Link href="/" legacyBehavior>
                <button>
                <h1 className="text-2xl md:text-7xl text-cyan-700 font-cormorant font-bold italic tracking-wider">Confessay</h1>
                </button>
            </Link>
            </li>
            </ul>
            <FullScreenNavbar />
        </nav>
    
    <div className="my-10 p-12 border-solid rounded-lg max-w-md mx-auto">
    <div className="text-start my-8">
      <h3 className="text-2xl font-bold font-medium">Rules</h3>
      <div>
        <p>
          Please follow these quick rules <Link href="/CreatorMessage" legacyBehavior><a className="text-cyan-700">here</a></Link>
        </p>
        <p className="text-red-600">Your accounts will be TERMINATED if you do not follow the rules.</p>
      </div>
    </div>
    <ToastContainer limit={1}/>
    <form onSubmit={submitPost}>
      <h1 className="text-2xl font-bold font-medium">
        {post.hasOwnProperty("id") ? "Edit your confession" : "Create a new confession"}
      </h1>
      <div className="py-2">
        <h3 className="text-lg font-medium py-2">Description</h3>
        <textarea
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
        ></textarea>
        <p
          className={`text-cyan-600 font-medium text-sm ${
            post.description.length > 800 ? "text-red-600" : "text-red-600"
          }`}
        >
          {post.description.length}/800
        </p>
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-600 text-white p-2 my-2 rounded-lg text-sm font-medium"
      >
        Submit
      </button>
    </form>
  </div>
  </div>
);
}
 
export default Post;
