import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";

const Danger = () => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleTerminateAccount = async () => {
    try {
      await auth.currentUser.delete();
      toast.success("Account terminated 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      router.push("/");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="text-end">
      <button
        className="text-white bg-yellow-500 py-2 px-4 mt-10 rounded-lg mr-2"
        onClick={() => {
          auth.signOut();
          toast.success("Signed out 🤘", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          router.push("/");
        }}
      >
        Sign out
      </button>
      <button
        className="text-white bg-red-500 py-2 px-4 mt-10 rounded-lg"
        onClick={() => setShowConfirm(true)}
      >
        Terminate Account
      </button>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg p-4 z-50 mx-4 md:mx-0">
            <p className="mb-4">Are you sure you want to terminate your account? This action is irreversible.</p>
            <div className="flex justify-end">
              <button className="text-white bg-red-500 py-2 px-4 rounded-lg mr-2" onClick={handleTerminateAccount}>
                Yes, terminate my account
              </button>
              <button className="text-gray-600 bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Danger;