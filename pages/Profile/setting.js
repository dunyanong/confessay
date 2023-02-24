import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Head from "next/head";
import { collection, deleteDoc, doc, onSnapshot,query, where,} from "firebase/firestore";
import Danger from "../../components/Danger";
import { useRouter } from "next/router";

//
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const Setting = () => {
  const [nickname, setNickname] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [user, loading] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const route = useRouter();

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

  const handleSaveChanges = async () => {
    // Update the user's display name and photo URL in Firebase
    const profileUpdates = {};
    if (nickname.trim() !== "") {
      profileUpdates.displayName = nickname;
    }
    if (photoURL.trim() !== "") {
      profileUpdates.photoURL = photoURL;
    }
    updateProfile(auth.currentUser, profileUpdates)
      .then(() => {
        // Display a success message and redirect the user
        toast.success("Profile updated successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        return route.push("/Profile");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
  };  
  
  return (
    <div className="md:px-5 md:py-30 w-full max-w-2xl mx-auto pt-20">
      <Head>
        <title>Confessay</title>
      </Head>
      <div className="">
      <h1 className="text-start font-semibold text-5xl mb-10 md:mb-20 text-black hover:cursor-pointer">Setting</h1>
      {posts.length > 0 && (
        <div className="flex justify-start">
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
              <h1 className="text-center font-semibold text-lg md:text-2xl text-black hover:cursor-pointer py-10">
                {user.displayName}
              </h1>
            )}
          </div>
      </div>
      )}      
      <form>
        <div className="mb-6">
          <label htmlFor="photoURL" className="block mb-2 text-sm text-gray-900 font-semibold">Profile Picture URL</label>
          <input type="text" id="photoURL" name="photoURL" value={photoURL} onChange={e => setPhotoURL(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter a URL for your profile picture" />
        </div>

        <div className="mb-6">
          <label htmlFor="nickname" className="block mb-2 text-sm text-gray-900 font-semibold">Nickname</label>
          <input type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={`${user ? user.displayName : ""}`} />
        </div>

        <button onClick={handleSaveChanges} className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Profile</button>
      </form>
      </div>

      <Danger />

    </div>
  );
};

export default Setting;