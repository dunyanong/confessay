import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from "../utils/firebase";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";

const Feedback = () => {
    //Form state
    const [feedback, setFeedback] = useState({ description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    //Submit Feedback
    const submitFeedback = async (e) => {
        e.preventDefault();
        //Run checks for description
        if (!feedback.description) {
            toast.error("no feedback written 😭", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        return;
        }
        if (feedback.description.length > 1000) {
            toast.error("Feedback is too long 🤡", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        return;
        }

        if (feedback?.hasOwnProperty("id")) {
        const docRef = doc(db, "feedbacks", feedback.id);
        const updatedFeedback = { ...feedback, timestamp: serverTimestamp() };
        await updateDoc(docRef, updatedFeedback);
        return route.push("/Frontpage");
        } else {
        //Make a new post
        const collectionRef = collection(db, "feedbacks");
        await addDoc(collectionRef, {
            ...feedback,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
            email: user.email
        });
        setFeedback({ description: "" });
        toast.success("feedback has been made 🚀", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
        return route.push("/Frontpage");
        }
    };

    //Check our user
    const checkUser = async () => {
        if (loading) return;
        if (!user) route.push("/auth/Login");
        if (routeData.id) {
            setFeedback({ description: routeData.description, id: routeData.id });
        }
    };

    useEffect(() => {
        checkUser();
    }, [user, loading]);

    return  (
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
        <Head>
          <title>Confessay</title>
        </Head>
        <div className="mt-2 my-10 md:my-10 py-12 md:p-12 border-solid rounded-lg max-w-xl mx-auto">
        <div className="text-center mb-8 ">
          <h1 className="text-2xl md:text-5xl font-bold mb-8">Write a feedback ✍️</h1>
            <p>
            Your thoughts and suggestions will be incredibly valuable as we work to improve our platform and better serve our users. We appreciate your support! 🤗 🙏
            </p>
        </div>
        
        <form onSubmit={submitFeedback}>
          <div className="py-2">
            <input 
              type="text" 
              className="w-full border border-gray-300 p-2 rounded-lg my-2" 
              value={feedback.subject} 
              onChange={(e) => setFeedback({...feedback, subject: e.target.value})} 
              placeholder="Main Subject 🙂" 
            />
          </div>
          <div className="py-2">
            <textarea 
              className="w-full border border-gray-300 p-2 rounded-lg my-2" 
              value={feedback.description} 
              onChange={(e) => setFeedback({...feedback, description: e.target.value})} 
              placeholder="Write your feedback here 💬" 
              rows="8"
            />
          </div>
          <button 
            className="bg-black text-white py-2 px-4 rounded-lg my-2 hover:bg-gray-800" 
            type="submit"
          >
            Send Feedback
          </button>
        </form>
      </div>
  </div>
);
}
 
export default Feedback;