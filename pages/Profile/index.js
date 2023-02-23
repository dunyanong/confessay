import Head from "next/head";
import Link from "next/link";

import { AiFillBell, AiFillMessage, AiFillSetting } from 'react-icons/ai'

export default function Home() {
  return (
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
      <Head>
        <title>Confessay</title>
      </Head>

      
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:mt-20">

        
        <div className="max-w-sm p-6 border border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl duration-1000">
        <Link href="/Profile/YourPost">
            <AiFillMessage className="w-10 h-10 mb-2 text-black"/>
            <span>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Your Confessions</h5>
            </span>
            <p className="mb-3 font-normal text-black">An organized collection of all your confession posts and to edit your comments or posts</p>
            <span className="inline-flex items-center text-blue-600 hover:underline">
                Click
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </span>
        </Link>    
        </div>
               
        <div className="max-w-sm p-6 border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl duration-1000">
        <Link href="/Profile/Notification">
            <AiFillBell className="w-10 h-10 mb-2 text-black"/>
            <span>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Notifications</h5>
            </span>
            <p className="mb-3 font-normal text-black">Get notified about new updates and any comments that mention you.</p>
            <span href="#" className="inline-flex items-center text-blue-600 hover:underline">
                Click
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </span>
        </Link>
        </div>
        
      </div>

      <div className="flex justify-center mt-10">
      <div className="max-w-sm p-6 border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl duration-1000">
      <Link href="/Profile/setting">
            <AiFillSetting className="w-10 h-10 mb-2 text-black"/>
            <span>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Setting</h5>
            </span>
            <p className="mb-3 font-normal text-black">Personalize your profile with a unique nickname and profile picture. Choose an avatar that represents you and make it easier for others to recognize you online.</p>
            <span href="#" className="inline-flex items-center text-blue-600 hover:underline">
                Click
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </span>
        </Link>
      </div>
      
      </div>

      </div>
  );
}