import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

export const MobileNav = ({ open, setOpen }) => {
    const [user, loading] = useAuthState(auth);
  
    const handleLinkClick = () => {
      setOpen(false);
    };
  
    return (
      <div
        className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
          open ? "-translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out filter z-50  `}
      >
        <div className="flex flex-col justify-center items-center mt-28">
          <div className="py-4 hover:underline text-sm md:text-base font-semibold">
            <Link href="/Frontpage" legacyBehavior>
              <a onClick={handleLinkClick}>Home</a>
            </Link>
          </div>
          <div className="py-4 hover:underline text-sm md:text-base font-semibold">
            <Link href="/About" legacyBehavior>
              <a onClick={handleLinkClick}>About</a>
            </Link>
          </div>
  
          <div className="py-4 hover:underline text-sm md:text-base font-semibold">
            {!user && (
              <Link href={"/auth/Login"} legacyBehavior>
                <a onClick={handleLinkClick}>Login</a>
              </Link>
            )}
            {user && (
              <div className="flex items-center gap-4">
                <Link href="/Post" legacyBehavior>
                  <a onClick={handleLinkClick}>Confess</a>
                </Link>
              </div>
            )}
          </div>
          <div className="py-4 hover:underline text-sm md:text-base font-semibold">
            {user && (
              <div className="flex items-center gap-4">
                <Link href="/Profile" legacyBehavior>
                  <a onClick={handleLinkClick}>Your Profile</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  

export const Hamburger = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-11/12 flex justify-end items-center">
                <div className="group z-50 relative w-6 h-6 cursor-pointer m-0 flex-col justify-between items-center flex" onClick={() => setOpen(!open)}>
                    <span className={`h-1 w-full bg-black  rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""}`} />
                    <span className={`h-1 w-full bg-black  rounded-lg group-hover:text-red-500 cursor-pointer transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black  rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
                </div>
            </div>
        </div>
    );
}
