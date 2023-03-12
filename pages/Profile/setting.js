import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Head from "next/head";
import { collection, deleteDoc, doc, onSnapshot,query, where,} from "firebase/firestore";
import DeleteAccount from "../../components/DeleteAccount";
import { useRouter } from "next/router";

//
import { getAuth, updateProfile } from "firebase/auth";
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
      <div>
      <h1 className="text-start font-semibold text-5xl mb-10 md:mb-20 text-black">Setting</h1>
      {posts.length > 0 && (
        <div className="flex items-center gap-1 md:gap-2">
        <div className="flex justify-start my-1">
            {user && (
              <div>
                <img
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover cursor-pointer mr-2"
                  src={user.photoURL}
                />
              </div>
            )}
        </div>
        <div>
          {user && (
            <div>
              <h1 className="text-start font-medium text-lg md:text-2xl text-black">
                {user.displayName}
              </h1>
              <p className="text-start font-normal text-sm md:text-md text-gray-600">{user.email}</p> 
            </div>
          )}              
        </div>    
        </div>        
      )}      
      
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg my-10 hover:shadow-xl duration-1000">
        {user && (
        <div className="mt-10 mb-5 py-4 px-4">
          <h3 className="text-lg font-semibold">Basic informations</h3>
          {user.providerData.length > 0 ? (
            <p className="text-sm font-normal my-1">Linked providers: {user.providerData.map((provider) => provider.providerId).join(', ')}</p>
          ) : (
            <p className="text-sm font-normal my-1">No linked providers</p>
          )}
          {user.metadata && (
            <>
              <p className="text-sm font-normal my-1">Last signed in: {new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
              <p className="text-sm font-normal my-1">Account created: {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
            </>
          )}
        </div>
        )}
      </div>

      <DeleteAccount />
      </div>
    </div>
  );
};

export default Setting;