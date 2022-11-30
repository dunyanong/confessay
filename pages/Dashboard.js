import Head from "next/head";
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
import Message from "../components/Message";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import { FullScreenNavbar } from "../components/FullScreenNavbar";

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
      return route.push("/auth/login")
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
    <div>
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
            <Message {...post} key={post.id}>
              <Link href={{ pathname: `/${post.id}`, query: { ...post } }} >
              <button className="font-medium font-sm mb-2 text-teal-600">
                {post.comments?.length > 0 ? post.comments?.length : 0} comments
              </button>
              </Link>
              <div className="flex gap-4 font-medium">
                <button
                  onClick={() => deletePost(post.id)}
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
            </Message>
          );
        })}
      </div>
      <button
        className="font-medium text-white bg-red-500 py-2 px-4 mt-10 rounded-lg"
        onClick={() => {
            auth.signOut();
            route.push("/");
            return;
        }}
      >
        Sign out
      </button>
    </div>
    </div>
  );
}
