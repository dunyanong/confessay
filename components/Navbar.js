import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Hamburger } from './Hamburger';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    return (
        <nav className="py-5 mb-12 mt-5 mx-5">
        <div className="hidden md:visible md:flex md:justify-between ">
        <div className="">
            <ul className="flex items-center">
              <Link legacyBehavior href="/">
                <a className="font-bold text-4xl text-cyan-600  hover:cursor-pointer">Confessay</a>          
              </Link>
            </ul>
        </div>
    
        <div className="flex gap-4 justify-center items-center">
                <div className="text-xl font-bold my-4 text-gray-800 hover:text-cyan-700 font-medium">
                <Link href="/" legacyBehavior>
                    <a>Home</a>
                </Link>
                </div>
                <div className="text-xl font-bold my-4 text-gray-800 hover:text-cyan-700 font-medium">
                <Link href="/CreatorMessage" legacyBehavior>
                    <a>About</a>
                </Link>
                </div>

                <div className="text-xl font-bold my-4 text-gray-800 hover:text-cyan-700 font-medium">
                {!user && (
                    <Link href={"/auth/Login"} legacyBehavior>
                        <a>Login</a>
                    </Link>
                )}
                {user && (
                    <div className="flex items-center gap-4">
                    <Link href="/Post" legacyBehavior>
                        <a>Confess</a>
                    </Link>
                    </div>
                )}
                </div>                
                <div className="text-xl font-bold my-4 text-gray-800 hover:text-cyan-700 font-medium">
                    {user && (
                        <div className="flex items-center gap-4">
                        <Link href="/Profile" legacyBehavior>
                            <a>Profile</a>
                        </Link>
                        </div>
                    )}
                </div> 
            </div> 
    
        </div>
    
        <div className="flex justify-between md:mt-3 md:hidden">
        <div className="">
            <ul className="flex items-center">
              <Link legacyBehavior href="/">
                <p className="font-bold text-2xl text-cyan-600 hover:cursor-pointer">Confessay</p>          
              </Link>
            </ul>
        </div>
    
        <div className="">            
            <Hamburger />
        </div>
        </div>
    
        </nav>
    );
}
 
export default Navbar;
