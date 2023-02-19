import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot,query, where,} from "firebase/firestore";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Head from "next/head";

const Setting = () => {
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
  
    // Get users data
    useEffect(() => {
      getData(searchQuery);
    }, [user, loading, searchQuery]);
  
    return (
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
        <Head>
          <title>Confessay</title>
        </Head>
        <div className="flex justify-center items-center">
          Coming soon.....
        <div>

        </div>



        <button
          className="text-white bg-red-500 py-2 px-4 mt-10 rounded-lg"
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
      </div>
    )
}
 
export default Setting;