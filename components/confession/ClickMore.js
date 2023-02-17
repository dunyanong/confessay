import { useState } from 'react';

// image
import spideyImage  from '../../img/spiderman.png'
import Image from "next/image";

const ClickMore = ({ children, description, username, timestamp, subject = "Confession" }) => {
  const [showMore, setShowMore] = useState(false);

  let today, messageDate, timeDifference, days, dateString;

  if (timestamp) {
    today = new Date();
    messageDate = new Date(timestamp.seconds * 1000);
    timeDifference = today - messageDate;
    days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (days >= 3) {
      if (today.getFullYear() === messageDate.getFullYear()) {
        dateString = messageDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric' });
      } else {
        dateString = messageDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } else if (days === 0) {
      dateString = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      dateString = `${days} days ago`;
    }
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }
  
  return (
    <div>

    <div className="py-4 px-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg my-10 hover:shadow-xl duration-1000">
    <div className="flex items-center pb-3">
        <Image src={spideyImage} alt="image" className="w-10 h-10 rounded-full object-cover cursor-pointer mr-2" />
        <div>
            <h1 className="font-semibold text-xl text-gray-900">SpideyLover</h1>    
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