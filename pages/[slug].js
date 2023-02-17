import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FaPaperPlane } from 'react-icons/fa';
import { useAuthState } from "react-firebase-hooks/auth";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Comments from '../components/Comments';
import ClickMore from '../components/confession/ClickMore';

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);
  const [user, loading] = useAuthState(auth);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) {
      
      toast.error("Login First 💀", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    })
    return router.push("/auth/Login");
    };

    if (!message) {
      console.log(message);
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
    toast.success("Commented 👍", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,})
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data) {
            setAllMessages(data.comments);
          }
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);
  return (
    <div className='w-full max-w-3xl mx-auto'>
    <Head>
      <title>Confessay</title>
    </Head>
    <ClickMore {...routeData}></ClickMore>

    <div className="mt-7">
    <h2 className="font-bold ml-1 mb-1">Reply confession</h2>
      <div className="flex">
        <input
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          type="text"
          value={message}
          placeholder="Add a reply 😀"
          className="bg-white shadow-sm border-2 rounded-md w-50 p-2 mr-1 text-gray-600 text-sm"
        />
        <button
          onClick={submitMessage}
          className="bg-cyan-500 text-white py-2 px-4 text-sm rounded-md"
        >
          <FaPaperPlane/>
        </button>
      </div>
      <h2 className="font-bold mt-10 ml-1">Comments</h2>
      <Comments allMessage={allMessage} user={user} />
    </div>
  </div>
  );
}
