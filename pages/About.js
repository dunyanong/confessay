import Head from "next/head";
import RulesDropdown from "../components/RulesDropdown";

// React icons
import { FaLightbulb, FaUserSecret, FaAngry } from 'react-icons/fa'
import { RiEmotionUnhappyFill } from 'react-icons/ri'
import { GiMedicines } from 'react-icons/gi'

const About = () => {
    return (
        <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
        <Head>
            <title>Confessay</title>
        </Head>
        <div>
            <h2 className="font-semibold text-3xl text-black hover:cursor-pointer">Guidelines</h2>
        </div>
        
        <div className="pt-10 pb-20">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
              <FaLightbulb className="w-5 h-5" />
              </div>
            </div>
            <div className="ml-4">
            <h3 className='text-lg leading-6 font-medium text-gray-900'>It must be a confession.</h3>
            <p className="mt-2 text-base text-gray-500">The confession can be the current state of mind, feelings and hardships of coping.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <FaUserSecret className="w-5 h-5" />
                </div>
            </div>
            <div className="ml-4">
            <h3 className='text-lg leading-6 font-medium text-gray-900'>No names or contact information to be shared.</h3>
            <p className="mt-2 text-base text-gray-500">If you are comfortable sharing your own name too, go ahead.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <FaAngry className="w-5 h-5" />
                </div> 
            </div>
            <div className="ml-4">
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Foul languages and hurtful comments are prohibited. </h3>
            <p className="mt-2 text-base text-gray-500">Be empathetic for the people who need to lend a pair of ear.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                <RiEmotionUnhappyFill className="w-5 h-5" />
                </div> 
            </div>
            <div className="ml-4">
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Avoid controversial topics.</h3>
            <p className="mt-2 text-base text-gray-500">Please keep in mind this is not an opinions page. Political posts, religious views, racial discrimination, abuse, hate speech or threatening post will not be tolerated and the user may be blocked.</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                    <GiMedicines className="w-5 h-5" />
                </div>  
            </div>
            <div className="ml-4">
            <h3 className='text-lg leading-6 font-medium'>Do not take medical advice from other users.</h3>
            <p className="mt-2 text-base text-gray-500">Always seek the guidance of your doctor or other qualified health professional with any questions you may have regarding your health or a medical condition.</p>
            </div>
          </div>          
          </div>
          </div>

        <div className="mb-4 ml-1">
            <h2 className="font-semibold text-3xl text-black hover:cursor-pointer">Questions</h2>
        </div>

        <RulesDropdown />
        </div>
    );
}
 
export default About;
