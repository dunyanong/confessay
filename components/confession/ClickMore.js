import { useEffect, useState } from 'react';

const ClickMore = ({ photoURL = "https://media.4-paws.org/e/8/2/7/e82789b9dc8a986d3b61c0aa7610affeecb93933/VIER%20PFOTEN_2015-04-27_010-1927x1333.jpg", children, description, username, timestamp, subject = "Confession" }) => {
  const [showMore, setShowMore] = useState(false);
  const [dateString, setDateString] = useState("");

  const updateTimeDifference = () => {
    if (timestamp) {
      const today = new Date();
      const messageDate = new Date(timestamp.seconds * 1000);
      const timeDifference = today - messageDate;
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const seconds = Math.floor(timeDifference / 1000);

      if (minutes >= 1) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        if (days >= 3) {
          if (today.getFullYear() === messageDate.getFullYear()) {
            setDateString(messageDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric' }));
          } else {
            setDateString(messageDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' }));
          }
        } else {
          setDateString(`${minutes} minutes ago`);
        }
      } else {
        setDateString(`${seconds} seconds ago`);
      }
    }
  }

  // call updateTimeDifference once to set the initial value of dateString
  useEffect(() => {
    updateTimeDifference();
  }, [timestamp]);

  // use setInterval to call updateTimeDifference every second to update the seconds part of dateString
  useEffect(() => {
    const interval = setInterval(updateTimeDifference, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }
  
  return (
    <div>

    <div className="py-4 px-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg my-10 hover:shadow-xl duration-1000">
    <div className="flex items-center pb-3">
        <img src={photoURL} alt="image" className="w-10 h-10 rounded-full object-cover cursor-pointer mr-2" />
        <div>
            <h1 className="font-semibold text-xl text-gray-900">{username}</h1>    
            <p className='text-xs text-gray-500'>{dateString}</p>
        </div>            
    </div>
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
        <div className="mt-1">
            <h2 className="font-semibold text-xl text-gray-700">{subject}</h2>                    
        </div>
        </div>                
    </div>

    <div className="py-4">
        <p className={`text-gray-700 text-sm whitespace-pre-line break-words ${showMore ? '' : 'line-clamp-3'}`}>
          {description}
        </p>
        <span className="text-blue-800 cursor-pointer" onClick={toggleShowMore}>{showMore ? 'Read less' : 'Read more'}</span>
      </div>
      <div className="text-gray-700">
        <div className="text-sm">{children}</div>
      </div>
    </div>
    
    </div>
  );
}

export default ClickMore;