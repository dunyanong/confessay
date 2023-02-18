import Link from "next/link";

const Footer = () => {
    return (
<footer className="mt-20 pb-5 bg-white bg-opacity-50 backdrop-blur-lg">
    <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
        <div>
            <h2 className="mb-6 text-sm font-semibold text-black uppercase">Pages</h2>
            <ul className="text-gray-500">
                <li className="mb-4">
                    <Link href="/Frontpage" legacyBehavior>
                    <a className=" hover:underline">Home</a>
                    </Link>
                </li>
                <li className="mb-4">
                    <Link href="/CreatorMessage" legacyBehavior>
                    <a href="#" className="hover:underline">About</a>
                    </Link>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-black uppercase">Help center</h2>
            <ul className="text-gray-500">
                <li className="mb-4">
                    <a href="https://twitter.com/dun_yan_" className="hover:underline" target="_blank">Twitter</a>
                </li>
                <li className="mb-4">
                    <a href="mailto:confessayishere@gmail.com" className="hover:underline" target="_blank">Email</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-sm font-semibold text-black uppercase">Others</h2>
            <ul className="text-gray-500">
                <li className="mb-4">
                    <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" className="hover:underline" target="_blank">Licensing</a>
                </li>
                <li className="mb-4">
                    <a href="/Frontpage" className="hover:underline" target="_blank">Support us (Coming soon)</a>
                </li>
            </ul>
        </div>
    </div>
    <div className="px-6 py-6 md:flex md:items-center md:justify-between">
        <span className="text-sm text-black text-black sm:text-center">© 2022 Confessay. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 md:mt-0">
            <a href="https://github.com/dunyanong/Confessay" className="text-black hover:text-gray-400" target="_blank">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                <span className="sr-only">GitHub account</span>
            </a>
        </div>
    </div>
</footer>
    );
}
 
export default Footer;