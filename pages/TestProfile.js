import Head from "next/head";

const TestProfile = () => {
  return (
      <div className="md:p-5 w-full max-w-3xl mx-auto pt-20">
      <Head>
        <title>Confessay</title>
      </Head>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 ">
        <div className="max-w-sm p-6 border border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl duration-1000">
            <svg className="w-10 h-10 mb-2 text-black" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Your Confessions</h5>
            </a>
            <p className="mb-3 font-normal text-black">An organized collection of all your confession posts.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                See our guideline
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
        </div>

        <div className="max-w-sm p-6 border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl duration-1000">
            <svg className="w-10 h-10 mb-2 text-black" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
            <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Notifications</h5>
            </a>
            <p className="mb-3 font-normal text-black">Get notified about new updates and any comments that mention you.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
                See our guideline
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
        </div>
      </div>

      <div className="flex justify-center mt-10">
      <div className="max-w-sm p-6 border-gray-200 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg hover:shadow-xl duration-1000">
          <svg className="w-10 h-10 mb-2 text-black" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
          <a href="#">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">Profile Setting</h5>
          </a>
          <p className="mb-3 font-normal text-black">Personalize your profile with a unique nickname and profile picture. Choose an avatar that represents you and make it easier for others to recognize you online.</p>
          <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
              See our guideline
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
          </a>
      </div>
      </div>

      </div>
  );
}
 
export default TestProfile;