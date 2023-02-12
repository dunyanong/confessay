import React from 'react';
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  // Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [user, loading] = useAuthState(auth);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts()
      .then(() => {
        setIsPending(false);
      })
  }, []);

  return (
      <div className="my-10 md:p-5">
        <h2 className="md:text-4xl text-3xl text-center font-medium font-semibold text-cyan-700">All Confessions</h2>
        { isPending && <h3 className="text-xl text-center pt-3 text-gray-800 font-medium">Loading.....</h3> }
        { allPosts.map((post) => (
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }} key={post.id}>
            <div className="font-medium">
            <Message key={post.id} {...post}>
                <button className="font-medium font-sm text-teal-600">
                  {post.comments?.length > 0 ? post.comments?.length : 0} comments
                </button>
            </Message>
            </div>
          </Link>
        )) }
      </div>
  );
}

export default Home;
