import { AiOutlineGoogle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from "react";
import { FullScreenNavbar } from "../../components/FullScreenNavbar";
import Link from "next/link";

const Login = () => {
  const route = useRouter();
  //Sign in with google
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div>
      <nav className="py-10 mb-12 flex justify-between items-center ">
          <ul className="flex">
          <li>
          <Link href="/" legacyBehavior>
              <button>
              <h1 className="text-2xl md:text-7xl text-cyan-700 font-cormorant font-bold italic tracking-wider">Confessay</h1>
              </button>
          </Link>
          </li>
          </ul>
          <FullScreenNavbar />
      </nav>

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
