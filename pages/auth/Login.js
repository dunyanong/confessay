import { AiOutlineGoogle, AiFillFacebook } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import Head from "next/head";

const Login = () => {
  const route = useRouter();
  //Sign in with google
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const displayErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/Post");
  
      toast.success("Signed in 🤙 ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Popup request cancelled by user");
      }
      else {
        console.error(error.message);
      }
    }    
  };
  
  const FacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = await FacebookAuthProvider.credentialFromResult(result)
      const token = credential.accessToken;
      let photoUrl = result.user.photoURL + '?height=500&access_token=' + token
      await updateProfile(auth.currentUser, {photoURL: photoUrl})
      route.push("/Post");
  
      toast.success("Signed in 🤙 ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Popup request cancelled by user");
      }
      else {
        console.error(error.message);
      }
    }    
  };

  useEffect(() => {
    if (!route || !route.push) return;
    
    if (user) {
      route.push("/Post");
    }
  }, [user]);

  return (
    <div className="w-full max-w-3xl mx-auto">
    <Head>
      <title>Confessay</title>
    </Head>
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full rounded-lg flex align-middle p-4 gap-2"
        >
          <AiOutlineGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <button
          onClick={FacebookLogin}
          className="text-white bg-blue-600 w-full rounded-lg flex align-middle p-4 gap-2 mt-4"
        >
          <AiFillFacebook className="text-2xl" />
          Sign in with Facebook
        </button>
      </div>
    </div>
    </div>
  );
}
 
export default Login;