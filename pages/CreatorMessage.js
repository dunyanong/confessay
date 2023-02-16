import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Hamburger } from "../components/Hamburger";
import { useState } from "react";
import Head from "next/head";
import RulesDropdown from "../components/RulesDropdown";

const CreatorMessage = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
            <Head>
                <title>Confessay</title>
            </Head>
        <div>
            <h2 className="font-semibold text-3xl text-black hover:cursor-pointer">Rules</h2>
        </div>
        <div className="">
            <ul>
                <div className="my-3 ">
                    <h3 className="text-2xl text-gray-700">1. It must be a confession.</h3>
                    <p className="text-gray-500">The confession can be the current state of mind, feelings and hardships of coping.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl text-gray-700">2. No names or contact information to be shared. </h3>
                    <p className="text-gray-500">If you are comfortable sharing your own name too, go ahead.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl text-gray-700">3. Foul languages and hurtful comments are prohibited. </h3>
                    <p className="text-gray-500">Be empathetic for the people who need to lend a pair of ear.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl text-gray-700">4. Avoid controversial topics.</h3>
                    <p className="text-gray-500">That means political posts, racial discrimination (unless you are the victim), religious views are not allowed.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl text-gray-700">5. Do not take medical advice from other users.</h3>
                    <p className="text-gray-500">Always seek the guidance of your doctor or other qualified health professional with any questions you may have regarding your health or a medical condition.</p>
                </div>

            </ul>
        </div>


        <div className="mb-4 ml-1">
            <h2 className="font-semibold text-3xl text-black hover:cursor-pointer">Questions</h2>
        </div>

        <RulesDropdown />
        </div>
    );
}
 
export default CreatorMessage;
