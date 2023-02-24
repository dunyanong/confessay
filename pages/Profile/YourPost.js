import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot,query, where,} from "firebase/firestore";
import { BsTrash2Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Head from "next/head";
import Personal from "../../components/confession/Personal";

const YourPost = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);  

  const getData = async (searchQuery) => {
    if (loading) {
      return;
    }
    if (!user) {
      return route.push("/auth/Login");
    }
  
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let filteredPosts = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((post) => {
          const subject = post.subject && post.subject.toLowerCase();
          const description = post.description && post.description.toLowerCase();
          const query = searchQuery && searchQuery.toLowerCase();
          return (subject && subject.includes(query)) || (description && description.includes(query));
        });
      setPosts(filteredPosts);
    });
    return unsubscribe;
  };
  
  //Delete Post
  const deletePost = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };

  // Get users data
  useEffect(() => {
    getData(searchQuery);
  }, [user, loading, searchQuery]);

  return (
    <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
      <Head>
        <title>Confessay</title>
      </Head>               
      {posts.length > 0 && (
        <div>
          <div className="flex justify-center items-center gap-1">
            {user && (
              <div>
                <img
                  className="w-6 h-6 md:w-12 md:h-12 rounded-full object-cover cursor-pointer mr-2"
                  src={user.photoURL}
                />
              </div>
            )}
            {user && (
              <h1 className="text-center font-semibold text-xl md:text-3xl text-black hover:cursor-pointer py-10">
                {user.displayName}
              </h1>
            )}
          </div>
          <div className="relative w-full max-w-md mx-auto md:w-3/4">
            <input
              type="text"
              placeholder="🔍 Search by title or description"
              className="block w-full pl-5 pr-4 py-2 border rounded-3xl bg-white bg-opacity-40 backdrop-filter backdrop-blur-md focus:outline-none focus:bg-opacity-40 focus:ring-2 focus:ring-blue-600"
              onChange={(e) => getData(e.target.value)}
            />
          </div>
      </div>
      )}
      {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-gray-500 font-bold text-2xl mb-4">
              You haven't made any posts yet!
            </h2>
            <p className="text-gray-500">
              Click on the <Link href="/Post" className="text-blue-600">here</Link> to make your first post
            </p>
          </div>
        ) : (
        <div>
          {posts.map((post) => {
            return (
              <div>
              {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  <div className="bg-white rounded-lg p-4 z-50 mx-4 md:mx-0">
                    <p className="mb-4">Are you sure you want to delete your posts? This action is irreversible.</p>
                    <div className="flex justify-end">
                      <button className="text-white bg-red-500 py-2 px-4 rounded-lg mr-2" onClick={() => {
                        toast.error("Post has been deleted 🗑️ ", {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 1500,
                        });
                        deletePost(post.id);
                        setShowConfirm(false)
                      }}>
                        Yes, delete my post
                      </button>
                      <button className="text-gray-600 bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setShowConfirm(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                )} 
              <Personal key={post.id} {...post}>
                <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
                  <button className="font-sm mb-2 text-teal-600">
                    {post.comments && post.comments.length > 0
                      ? post.comments.length
                      : 0}{" "}
                    comments
                  </button>
                </Link>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConfirm(true)}
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
              </Personal>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default YourPost;