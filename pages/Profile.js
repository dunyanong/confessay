import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import ClickMore from "../components/confession/ClickMore";
import Head from "next/head";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  

  const getData = async () => {
    if (loading) {
      return;
    }
    if (!user) {
      return route.push("/auth/Login")
    };

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };    

  //Delete Post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  // Get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <Head>
        <title>Confessay</title>
      </Head>
      <div className="flex justify-center items-center">
      {user && (
        <div>
          <img className="w-12 rounded-full cursor-pointer mr2" src={user.photoURL}/>
        </div>
      )}
        <h1 className="text-3xl font-medium font-semibold text-cyan-700 ml-2">Your posts</h1>
      </div>
      <div>
        {posts.map((post) => {
          return (
            <ClickMore key={post.id} {...post} >
              <Link href={{ pathname: `/${post.id}`, query: { ...post } }} >
              <button className="font-medium font-sm mb-2 text-teal-600">
                {post.comments && post.comments.length > 0 ? post.comments.length : 0} comments
              </button>
              </Link>
              <div className="flex gap-4 font-medium">
                <button
                  onClick={
                    () => {              
                      toast.error("Post has been deleted 🗑️ ", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                    });
                    return deletePost(post.id);
                    }
                  }
                  className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                >
                  <BsTrash2Fill className="text-2xl" /> Delete
                </button>
                <Link href={{ pathname: "/Post", query: post }}>
                  <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                    <AiFillEdit className="text-2xl" />
                    Edit
                  </button>
                </Link>
              </div>
            </ClickMore>
          );
        })}
      </div>
      <button
        className="font-medium text-white bg-red-500 py-2 px-4 mt-10 rounded-lg"
        onClick={() => {
          auth.signOut();
          toast.success("Signed out 🤘", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          })
          return route.push("/");
        }}
      >
        Sign out
      </button>
    </div>
  );
}
