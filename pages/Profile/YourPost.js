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
import ClickMore from "../../components/confession/ClickMore";
import Head from "next/head";

const YourPost = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
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
              <ClickMore key={post.id} {...post}>
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
                    onClick={() => {
                      toast.error("Post has been deleted 🗑️ ", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                      });
                      return deletePost(post.id);
                    }}
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
      )}
    </div>
  );
  
}

export default YourPost;