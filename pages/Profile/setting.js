import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Head from "next/head";
import { getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Danger from "../../components/Danger";

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
  
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSecretPhotoChange = (event) => {
    setSecretPhoto(event.target.value);
  };

  const handleSaveChanges = async () => {
    // Update the user's display name and photo URL in Firebase
    updateProfile(auth.currentUser, {
      displayName: nickname,
      photoURL: secretPhoto,
    }).then(() => {
      setTimeout(() => {
        // Display a success message and redirect the user
        toast.success("Changes saved 🎉", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        router.push("/profile");
      }, 1000);
    }).catch((error) => {
      setTimeout(() => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      }, 1000);
    });
    
  };  

  return (
    <div className="md:px-5 md:py-30 w-full max-w-2xl mx-auto pt-20">
      <Head>
        <title>Confessay</title>
      </Head>
      <div className="">
      <h2 className="text-start font-semibold text-3xl mb-10 text-black hover:cursor-pointer">Nickname & Avatar</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900">Nickname</label>
          <input type="text" id="nickname" name="nickname" value={nickname} onChange={handleNicknameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Edit nickname" />
        </div>
        <div className="mb-6">
          <label htmlFor="secretPhoto" className="block mb-2 text-sm font-medium text-gray-900">Photo avatar</label>
          <input type="text" id="secretPhoto" name="secretPhoto" value={secretPhoto} onChange={handleSecretPhotoChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Edit photo avatar" />
        </div>
        <button onClick={handleSaveChanges} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>
      </div>

      <Danger />

    </div>
  );
};

export default Setting;