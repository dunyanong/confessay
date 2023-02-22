import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Head from "next/head";
import { collection, deleteDoc, doc, onSnapshot,query, where,} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Danger from "../../components/Danger";
import { useRouter } from "next/router";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const Setting = () => {
  const [nickname, setNickname] = useState("");
  const [secretPhoto, setSecretPhoto] = useState("");
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
  
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSecretPhotoChange = (event) => {
    setSecretPhoto(event.target.value);
  };

  const handleSaveChanges = async () => {
    // Update the user's display name and photo URL in Firebase
    const profileUpdates = {};
    if (nickname.trim() !== "") {
      profileUpdates.displayName = nickname;
    }
    if (secretPhoto.trim() !== "") {
      profileUpdates.photoURL = secretPhoto;
    } else if (user.photoURL) {
      profileUpdates.photoURL = user.photoURL;
    }
    updateProfile(auth.currentUser, profileUpdates)
      .then(() => {
        setTimeout(() => {
          // Display a success message and redirect the user
          toast.success("Changes saved 🎉", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          router.push("/profile");
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }, 1000);
      });
  };
   

  // Get users data
  useEffect(() => {
    getData(searchQuery);
  }, [user, loading, searchQuery]);

  return (
    <div className="md:px-5 md:py-30 w-full max-w-2xl mx-auto pt-20">
      <Head>
        <title>Confessay</title>
      </Head>
      <div className="">
      <h1 className="text-start font-semibold text-5xl mb-10 md:mb-20 text-black hover:cursor-pointer">Setting</h1>
      <form>

        <div className="flex justify-start mb-6 items-center gap-3">
          {user && <img className="w-6 h-6 md:w-12 md:h-12 rounded-full object-cover cursor-pointer mr-2" src={user.photoURL}/>}          
          <label htmlFor="photo-input" className="btn bg-white text-black font-semibold text-xs px-4 py-1 md:px-5 md:py-2 md:text-sm rounded-md cursor-pointer">
            Upload Photo
          </label>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            onChange={handleSecretPhotoChange}
            style={{ display: "none" }}
          />    
        </div>  

        <div className="mb-6">
          <label htmlFor="nickname" className="block mb-2 text-sm text-gray-900 font-semibold">Nickname</label>
          <input type="text" id="nickname" name="nickname" value={nickname} onChange={handleNicknameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={`${user ? user.displayName : ""}`} />
        </div>

        <button onClick={handleSaveChanges} className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Profile</button>
      </form>
      </div>

      <Danger />

    </div>
  );
};

export default Setting;