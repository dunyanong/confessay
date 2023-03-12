import Head from "next/head";
import Link from "next/link";
import { AiFillHeart } from 'react-icons/ai'

// import image
import spideyImage  from '../img/spiderman.png'
import Image from "next/image";

export default function Home() {
    return (
        <div className="md:px-5 w-full max-w-3xl mx-auto pt-20">
            <Head>
            <title>Confessay</title>
            </Head>            
            <div>
                <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">Share your burdens, lighten your heart.</h1>
            </div>  

            <div className="py-4 px-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg my-10 hover:shadow-xl duration-1000">
            <div className="flex items-center pb-3">
                <Image src={spideyImage} alt="image" className="w-10 h-10 rounded-full object-cover cursor-pointer mr-2" />
                <div>
                    <h1 className="font-semibold text-xl text-gray-900">10 mins ago</h1>    
                    <p className='text-xs text-gray-500'>Confession</p>
                </div>            
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                <div className="mt-1">
                    <h2 className="font-semibold text-xl text-gray-700">I'm not sure what I'm doing with my life</h2>                    
                </div>
                </div>                
            </div>

            <div className="py-4">
                <p className="text-gray-700 text-sm whitespace-pre-line break-words">
                I'm in my mid-twenties and I feel lost. I don't have a clear idea of what I want to do with my life, and it's scary to see my peers succeeding while I feel stuck. I hope that confessing here will help me find some clarity.
                </p>
            </div>
            <div className="text-teal-600">
                <p className="text-sm">3 comments</p>
            </div>
            </div> 


            <div>
                <p className="mt-6 text-base md:text-lg text-slate-600 text-center max-w-3xl mx-auto">Connect with a supportive community on our modern web app. Our safe and user-friendly platform allows you to release negative emotions and live life to the fullest.</p>
            </div>               
            <Link href='/auth/Login' legacyBehavior>
            <button className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                <p>Get Started</p>
                <AiFillHeart className="fill-current w-4 h-4 mr-2" />              
            </button>            
          </Link>   
        </div>
    );
}