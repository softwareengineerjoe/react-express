import React from "react";
import { useUser } from "../../context/UserContext";

export default function Signout() {
  const { isSignoutOpen, closeSignout, signoutAccount } = useUser();

  if (!isSignoutOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-5 w-76">
        <h3 className="font-semibold text-xl">Sign out</h3>
        <p className="mt-3">
          Are you sure you want to sign out? All unsaved changes will be lost.
        </p>
        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            onClick={closeSignout}
            className="px-3 py-2 font-semibold cursor-pointer rounded hover:bg-gray-100 ease-in duration-150"
          >
            Cancel
          </button>
          <button
            onClick={signoutAccount}
            className="px-3 py-2 font-semibold cursor-pointer rounded hover:bg-gray-100 ease-in duration-150"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
