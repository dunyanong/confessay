import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";

const Danger = () => {
  const router = useRouter();
  const [showConfirmSignout, setShowConfirmSignout] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSignoutAccount = async () => {
    try {
      await auth.signOut();
      toast.success("Signed out 🤘", {
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
    <div className="mt-10">
      {showConfirmSignout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg p-4 z-50 mx-4 md:mx-0">
            <p className="mb-4">Are you sure you want to signout</p>
            <div className="flex justify-end">
              <button className="text-white bg-red-500 py-2 px-4 rounded-lg mr-2" onClick={handleSignoutAccount}>
                Signout
              </button>
              <button className="text-gray-600 bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setShowConfirmSignout(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}      
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white rounded-lg p-4 z-50 mx-4 md:mx-0">
            <p className="mb-4">Are you sure you want to terminate your account? This action is irreversible.</p>
            <div className="flex justify-end">
              <button className="text-white bg-red-500 py-2 px-4 rounded-lg mr-2" onClick={handleTerminateAccount}>
                Yes, terminate my account
              </button>
              <button className="text-gray-600 bg-gray-300 py-2 px-4 rounded-lg" onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}      
      <div className="mt-10 mb-5 pt-4 px-4">
        <h3 className="text-lg font-semibold">Sign Out Account</h3>
        <p className="text-sm font-normal">Disconnect from your account and return to the login screen.</p>
        <button
          className="text-white bg-red-500 py-1 px-4 rounded-lg text-end mt-5"
          onClick={() => setShowConfirmSignout(true)}
        >
          Sign out
        </button>
      </div>

      <hr/>

      <div className="py-4 px-4">
        <h3 className="text-lg font-semibold">Delete Account</h3>
        <p className="text-sm font-normal">Permanently remove your Personal Account and all of its contents from the Confessay platform. This action is not reversible, so please continue with caution.</p>
        <button className="text-white bg-red-500 py-1 px-4 rounded-lg text-end mt-5" onClick={() => setShowConfirmDelete(true)}>
          Terminate Account
        </button>
      </div>
    </div>
  );
};

export default Danger;