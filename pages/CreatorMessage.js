import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Hamburger } from "../components/Hamburger";
import { useState } from "react";
import Head from "next/head";

const CreatorMessage = () => {
    const [user, loading] = useAuthState(auth);

    // To open the dropdown
    let [style1, setStyle1] = useState("hiddenFunction1");
    let [style2, setStyle2] = useState("hiddenFunction2");
    let [style3, setStyle3] = useState("hiddenFunction3");
    let [style4, setStyle4] = useState("hiddenFunction4");

    const changeStyle1 = () => {
        setStyle1("visibleFunction1");

        if( style1 == "visibleFunction1"){
            setStyle1("hiddenFunction1");
        }
      };
    const changeStyle2 = () => {
        setStyle2("visibleFunction2");

        if( style2 == "visibleFunction2"){
            setStyle2("hiddenFunction2");
        }
    };
    const changeStyle3 = () => {
        setStyle3("visibleFunction3");
        
        if( style3 == "visibleFunction3"){
            setStyle3("hiddenFunction3");
        }
    };
    const changeStyle4 = () => {
        setStyle4("visibleFunction4");
        
        if( style4 == "visibleFunction4"){
            setStyle4("hiddenFunction4");
        }
    };

    return (
        <div>
            <Head>
                <title>Confessay</title>
            </Head>
        <div>
            <h2 className="text-3xl text-start font-medium font-semibold text-cyan-700">Rules</h2>
        </div>
        <div className="mb-11 mt-5">
            <ul className="font-medium">
                <div className="my-3 ">
                    <h3 className="text-2xl font-medium text-gray-700">1. It must be a confession.</h3>
                    <p className="text-gray-500">The confession can be the current state of mind, feelings and hardships of coping.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl font-medium text-gray-700">2. No names or contact information to be shared. </h3>
                    <p className="text-gray-500">If you are comfortable sharing your own name too, go ahead.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl font-medium text-gray-700">3. Foul languages and hurtful comments are prohibited. </h3>
                    <p className="text-gray-500">Be empathetic for the people who need to lend a pair of ear.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl font-medium text-gray-700">4. Avoid controversial topics.</h3>
                    <p className="text-gray-500">That means political posts, racial discrimination (unless you are the victim), religious views are not allowed.</p>
                </div>
                <div className="my-3">
                    <h3 className="text-2xl font-medium text-gray-700">5. Do not take medical advice from other users.</h3>
                    <p className="text-gray-500">Always seek the guidance of your doctor or other qualified health professional with any questions you may have regarding your health or a medical condition.</p>
                </div>

            </ul>
        </div>


        <div className="mb-4 ml-1">
            <h2 className="text-3xl text-start font-medium font-semibold text-cyan-700">Questions</h2>
        </div>

        <div className="font-medium " id="accordion-open" data-accordion="open">
        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle1} className="rounded-t-lg flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center font-medium"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Why is Confessay created?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style1} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200">
            <p className="mb-2 text-gray-500 font-medium">The aim of Confessay is to allow people to talk about or express emotion freely and to avoid bottling up emotions.</p>
            <p className="mb-2 text-gray-500 font-medium">Describing and talking about an emotion out loud tends to decrease its effect of it.</p>
            <p className="mb-2 text-gray-500 font-medium">Source: <a className="text-cyan-700 font-medium"  target="_blank" href="https://pubmed.ncbi.nlm.nih.gov/3612492/">research1</a>, <a className="text-cyan-700 font-medium"  target="_blank" href="https://www.researchgate.net/publication/323518229_Culture_emotion_suppression_and_disclosure_and_health">research2inPDF</a></p>
            </div>
        </div>

        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle2} className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center font-medium"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Who created Confessay?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style2} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200">
            <p className="mb-2 text-gray-500 font-medium">Confessay is created by a Malaysian developer, Dun Yan. </p>
            <p className="text-gray-500 font-medium">Click here to know more: <a href="https://github.com/dunyanong" className="text-cyan-700 font-medium"  target="_blank"> more info</a></p>
            </div>
        </div>

        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle3} className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center font-medium"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Privacy issues?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style3} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200">
            <p className="mb-2 text-gray-500 font-medium">Your privacy is safe with us, we do not share your private information with anyone. </p>
            </div>
        </div>

        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle4} className="rounded-b-lg flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center font-medium"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Am I anonymous in the confession posts?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style4} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200 rounded-lg">
            <p className="mb-2 text-gray-500 font-medium">Your username will not be displayed on the post to protect your identity. However, it will be shown if you comment under any post including your own.</p>
            </div>
        </div>

        </div>
        </div>
    );
}
 
export default CreatorMessage;
