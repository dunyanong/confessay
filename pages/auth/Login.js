import { AiOutlineGoogle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

const Login = () => {
  const route = useRouter();
  //Sign in with google
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

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
      } else {
        console.error(error);
      }
    }
  };
  
  useEffect(() => {
    if (!route || !route.push) return;
    
    if (user) {
      route.push("/Post");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div>
    <Head>
      <title>Confessay</title>
    </Head>
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-semibold font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4 font-medium">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <AiOutlineGoogle className="text-2xl font-medium" />
          Sign in with Google
        </button>
      </div>
    </div>
    </div>
  );
}
 
export default Login;
