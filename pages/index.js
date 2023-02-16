import React from 'react';
import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import Front from '../components/confession/Front';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>Confessay</title>
      </Head>
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">        
        <h2 className="text-center font-semibold text-3xl text-black hover:cursor-pointer">All Confessions</h2>
        { isPending && <h3 className="text-xl text-center pt-3 text-gray-800">Loading.....</h3> }
        { allPosts.map((post) => (
          <Link href={{ pathname: `/${post.id}`, query: { ...post } }} key={post.id}>
            <div>
            <Front key={post.id} {...post}>
                <button className="font-medium font-sm text-teal-600">
                {post.comments && post.comments.length > 0 ? post.comments.length : 0} comments
                </button>
            </Front>
            </div>
          </Link>
        )) }
      </div>
      </div>
  );
}

export default Home;
