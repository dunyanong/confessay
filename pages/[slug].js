import Message from "../components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FaPaperPlane } from 'react-icons/fa';
import { useAuthState } from "react-firebase-hooks/auth";
import { FullScreenNavbar } from "../components/FullScreenNavbar";
import { FaUserSecret } from 'react-icons/fa'
import Link from "next/link";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);
  const [user, loading] = useAuthState(auth);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");

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
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);
  return (
    <div>

      <nav className="py-10 mb-12 flex justify-between items-center">
        <ul className="flex">
        <li>
          <Link href="/" legacyBehavior>
            <button className="text-2xl md:text-7xl text-cyan-700 font-cormorant font-bold">Confessay</button>
          </Link>
        </li>
        </ul>
        <FullScreenNavbar />
      </nav>
      
    <Message {...routeData}></Message>

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
          <FaPaperPlane className="text-l"/>
        </button>
      </div>
      <h2 className="font-bold mt-10 ml-1">Comments</h2>
      <div className="w-26 ">
      { allMessage?.map((message) => (
        <div className="py-6 mb-2 text-base bg-white rounded-lg ">
          <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {user && (
                  <div>
                    <img src={message.avatar} className="mr-2 w-6 h-6 rounded-full"/>
                  </div>
                )}
                {!user && (
                  <div className="text-gray-900 mr-1">
                    <FaUserSecret size={20}/>
                  </div>
                )}
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">{message.userName}</p>
                <p className="text-sm text-gray-500 ">{message.time.toDate().toDateString()}</p>
              </div>
          </div>
          <p className="text-gray-600 break-words">{message.message}</p>
        </div>  
      ))}
      </div>
    </div>
  </div>
  );
}
