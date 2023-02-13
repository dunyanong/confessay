import Link from 'next/link';
import { Hamburger } from './Hamburger'

const Navbar = () => {
    return (
        <nav className="py-10 mb-12 flex justify-between items-center px-5">
            <ul className="flex">
            <li>
            <Link href="/" legacyBehavior>
                <button>
                <h1 className="text-2xl md:text-7xl text-cyan-700 font-cormorant font-bold italic tracking-wider">Confessay</h1>
                </button>
            </Link>
            </li>
            </ul>
            <Hamburger />
        </nav>
    );
}
 
export default Navbar;