import { useState } from "react";

const RulesDropdown = () => {
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
        <div id="accordion-open" data-accordion="open" className="bg-white bg-opacity-30">
        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle1} className="rounded-t-lg flex items-center justify-between w-full p-5 text-left text-gray-700 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Why is Confessay created?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style1} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 text-gray-500 border border-gray-200">
            <p className="mb-2">The aim of Confessay is to allow people to talk about or express emotion freely and to avoid bottling up emotions.</p>
            <p className="mb-2">Describing and talking about an emotion out loud tends to decrease its effect of it.</p>
            <p className="mb-2">Source: <a className="text-cyan-700"  target="_blank" href="https://pubmed.ncbi.nlm.nih.gov/3612492/">research1</a>, <a className="text-cyan-700 "  target="_blank" href="https://www.researchgate.net/publication/323518229_Culture_emotion_suppression_and_disclosure_and_health">research2inPDF</a></p>
            </div>
        </div>

        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle2} className="flex items-center justify-between w-full p-5 text-left text-gray-700 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Who created Confessay?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style2} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200">
            <p className="mb-2 text-gray-500">Confessay is created by a Malaysian developer, Dun Yan. </p>
            <p className="text-gray-500">Click here to know more: <a href="https://dunyan.vercel.app" className="text-cyan-700"  target="_blank"> more info</a></p>
            </div>
        </div>

        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle3} className="flex items-center justify-between w-full p-5 text-left text-gray-700 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Privacy issues?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style3} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200">
            <p className="mb-2 text-gray-500">Your privacy is safe with us, we do not share your private information with anyone. </p>
            </div>
        </div>

        <h2 id="accordion-open-heading-2">
            <button type="button" onClick={changeStyle4} className="rounded-b-lg flex items-center justify-between w-full p-5 text-left text-gray-700 border border-gray-200 hover:bg-gray-100" data-accordion-target="#accordion-open-body-2" aria-expanded="false" aria-controls="accordion-open-body-2">
            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Am I anonymous in the confession posts?</span>
            <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </h2>
        <div id="accordion-open-body-2" className={style4} aria-labelledby="accordion-open-heading-2">
            <div className="p-5 font-light border border-gray-200 rounded-lg">
            <p className="mb-2 text-gray-500">Your username will not be displayed on the post to protect your identity. However, it will be shown if you comment under any post including your own.</p>
            </div>
        </div>

        </div>
    );
}
 
export default RulesDropdown;