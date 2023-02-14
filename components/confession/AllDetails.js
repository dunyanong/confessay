import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';

const Details = ({ children, description, username, timestamp, subject = "Confession" }) => {
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
  
  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg my-10 hover:shadow-xl duration-1000">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-yellow-400">
            <AiFillStar size={27}/>
          </div>
          <div className="mt-1">
            <h2 className="font-semibold text-2xl text-gray-700 font-medium">{subject}</h2>
          </div>
        </div>        
        <p className='text-lg text-gray-700 font-medium'>{dateString}</p>
      </div>

      <div className="py-4">
      <p className="text-gray-700 font-medium text-l whitespace-pre-line break-words">
        {description}
      </p>
      </div>
      <div className="text-gray-700">
        <p className="font-medium text-sm">{children}</p>
      </div>
    </div>
  );
}

export default Details;