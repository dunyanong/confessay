import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Hamburger } from './Hamburger';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    return (
        <nav className="py-5 mb-12 mt-5 md:mt-0 w-full max-w-3xl mx-auto">
        <div className="hidden items-center md:visible md:flex md:justify-between ">
        <div className="">
            <ul className="flex items-center">
              <Link legacyBehavior href="/">
                <a className="font-bold text-4xl text-cyan-600 hover:cursor-pointer">Confessay</a>          
              </Link>
            </ul>
        </div>
    
        <div className="flex gap-4 justify-center items-center">
                <div className="py-4 hover:underline text-sm md:text-base font-semibold">
                <Link href="/" legacyBehavior>
                    <a>Home</a>
                </Link>
                </div>
                <div className="py-4 hover:underline text-sm md:text-base font-semibold">
                <Link href="/CreatorMessage" legacyBehavior>
                    <a>About</a>
                </Link>
                </div>

                <div className="py-4 hover:underline text-sm md:text-base font-semibold">
                {!user && (
                    <Link href={"/auth/Login"} legacyBehavior>
                        <a>Login</a>
                    </Link>
                )}
                {user && (
                    <div className="py-4 hover:underline text-sm md:text-base font-semibold">
                    <Link href="/Post" legacyBehavior>
                        <a>Confess</a>
                    </Link>
                    </div>
                )}
                </div>                
                <div className="py-4 hover:underline text-sm md:text-base font-semibold">
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
    
        <div className="flex justify-between md:mt-3 md:hidden w-full max-w-3xl mx-auto px-5 md:px-10">
            <ul className="flex items-center">
              <Link legacyBehavior href="/">
                <p className="font-bold text-2xl text-cyan-600 hover:cursor-pointer">Confessay</p>          
              </Link>
            </ul>             
            <Hamburger />
        </div>
    
        </nav>
    );
}
 
export default Navbar;
