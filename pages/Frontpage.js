import { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import Front from '../components/confession/Front';
import Head from 'next/head';

const Frontpage = () => {
  // Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [user, loading] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    const filtered = allPosts.filter(post => {
      const subjectMatch = post.subject && post.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return subjectMatch || descriptionMatch;
    });
    setFilteredPosts(filtered);
  }, [allPosts, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Confessay</title>
      </Head>
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">        
        <h2 className="text-center font-semibold text-3xl text-black hover:cursor-pointer">Confessions</h2>
        <div className="md:w-3/4 mx-auto pt-4">
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="🔍 Search by title or description"
            className="block w-full pl-5 pr-4 py-2 border rounded-3xl bg-white bg-opacity-40 backdrop-filter backdrop-blur-md focus:outline-none focus:bg-opacity-40"
            onChange={handleSearch}
          />
        </div>
        </div>
        
        { isPending && <h3 className="text-xl text-center pt-3 text-gray-800">Loading.....</h3> }
        { filteredPosts.map((post) => (
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

export default Frontpage;