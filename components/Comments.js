import React from "react";
import { FaUserSecret } from "react-icons/fa";

const Comments = ({ allMessage, user }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {allMessage?.length > 0 ? (
        allMessage.map((message) => (
          <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg mb-4" key={message.id}>
            <div className="flex items-center mb-2">
              {user && (
                <div className="w-8 h-8 mr-2">
                  <img src={message.avatar} className="rounded-full w-full h-full" />
                </div>
              )}
              {!user && (
                <div className="text-gray-900 mr-2">
                  <FaUserSecret size={20} />
                </div>
              )}
              <div>
                <p className="text-gray-900 font-medium">{message.userName}</p>
                <p className="text-gray-500 text-sm">{message.time.toDate().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <p className="text-gray-700">{message.message}</p>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-700 text-sm">There are currently no comments</p>
        </div>
      )}
    </div>
  );
}

export default Comments;