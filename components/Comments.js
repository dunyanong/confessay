import React from "react";
import { FaUserSecret } from "react-icons/fa";

const Comments = ({ allMessage, user }) => {
  return (
    <div className="w-26">
      {allMessage?.map((message) => (
        <div className="py-6 mb-2 text-base rounded-lg" key={message.id}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {user && (
                <div>
                  <img src={message.avatar} className="mr-2 w-6 h-6 rounded-full" />
                </div>
              )}
              {!user && (
                <div className="text-gray-900 mr-1">
                  <FaUserSecret size={20} />
                </div>
              )}
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">{message.userName}</p>
              <p className="text-sm text-gray-500 ">{message.time.toDate().toDateString()}</p>
            </div>
          </div>
          <p className="text-gray-600 break-words">{message.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
