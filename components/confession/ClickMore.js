import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, deleteDoc, doc, onSnapshot,query, where,} from "firebase/firestore";
//
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { useRouter } from 'next/router';

const ClickMore = ({ avatar = "https://images.unsplash.com/photo-1445810694374-0a94739e4a03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1892&q=80", children, description, username, timestamp, subject = "Confession" }) => {
  const route = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [dateString, setDateString] = useState("");
  const [user, loading] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  const getData = async (searchQuery) => {
    if (loading) {
      return;
    }
    if (!user) {
      return route.push("/auth/Login");
    }
  
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let filteredPosts = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((post) => {
          const subject = post.subject && post.subject.toLowerCase();
          const description = post.description && post.description.toLowerCase();
          const query = searchQuery && searchQuery.toLowerCase();
          return (subject && subject.includes(query)) || (description && description.includes(query));
        });
      setPosts(filteredPosts);
    });
    return unsubscribe;
  };   

    // Get users data
    useEffect(() => {
      getData(searchQuery);
    }, [user, loading, searchQuery]);   

    const updateTimeDifference = () => {
      if (timestamp) {
        const today = new Date();
        const messageDate = new Date(timestamp);
        const timeDifference = today - messageDate;
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor(timeDifference / 1000);
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        
        if (hours >= 1) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          if (days >= 3) {
            if (today.getFullYear() === messageDate.getFullYear()) {
              setDateString(messageDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric' }));
            } else {
              setDateString(messageDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric' }));
            }
          } else {
            setDateString(`${hours} hr${hours > 1 ? 's' : ''} ago`);
          }
        } else if (minutes >= 1) {
          setDateString(`${minutes} min${minutes > 1 ? 's' : ''} ago`);
        } else {
          setDateString(`${seconds} sec${seconds > 1 ? 's' : ''} ago`);
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
        <img src={avatar} alt="image" className="w-10 h-10 rounded-full object-cover cursor-pointer mr-2" />
        <div>
            <h1 className="font-semibold text-xl text-gray-900">{dateString}</h1>    
            <p className='text-xs text-gray-500'>Confession</p>
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