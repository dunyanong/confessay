import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { Hamburger } from './Hamburger';
import Image from "next/image";

// import logo image
import Logo from '.././../img/logo.png'


const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    return (
        <nav className="bg-white fixed bg-opacity-50 backdrop-blur-lg md:mt-0 w-full mx-auto z-50">
        <div className="hidden items-center md:visible md:flex md:justify-between px-10 py-2">
        <div className="hover:cursor">
            <ul className="flex items-center">
              <Link legacyBehavior href="/Frontpage">
                <Image src={Logo} width={80} alt="image"/>
              </Link>
              <Link legacyBehavior href="/Frontpage">
                <a className="font-bold text-2xl text-black tracking-tighter">Confessay</a>          
              </Link>
            </ul>
        </div>
    
        <div className="flex gap-4 justify-center items-center">
                <div className="hover:underline text-sm md:text-base font-semibold">
                <Link href="/Frontpage" legacyBehavior>
                    <a>Home</a>
                </Link>
                </div>
                <div className="hover:underline text-sm md:text-base font-semibold">
                <Link href="/About" legacyBehavior>
                    <a>About</a>
                </Link>
                </div>

                <div className="hover:underline text-sm md:text-base font-semibold">
                {!user && (
                    <Link href={"/auth/Login"} legacyBehavior>
                        <a>Login</a>
                    </Link>
                )}
                {user && (
                    <div className="hover:underline text-sm md:text-base font-semibold">
                    <Link href="/Post" legacyBehavior>
                        <a>Confess</a>
                    </Link>
                    </div>
                )}
                </div>                
                <div className="hover:underline text-sm md:text-base font-semibold">
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
    
        <div className="flex justify-between md:mt-3 md:hidden w-full max-w-3xl mx-auto px-5 md:px-10 py-5 items-center hover:cursor">
            <ul className="flex items-center">
                <Link legacyBehavior href="/Frontpage">
                    <Image src={Logo} width={80} alt="image"/>
                </Link>
                <Link legacyBehavior href="/Frontpage">
                    <p className="font-bold text-2xl text-black tracking-tighter">Confessay</p>          
                </Link>
            </ul>             
            <Hamburger />
        </div>
    
        </nav>
    );
}
 
export default Navbar;
