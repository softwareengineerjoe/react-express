import React from "react";
import alertIcon from "../../assets/Icons/Alert.svg"
import closeIcon from "../../assets/Icons/Close.svg"

export default function DeleteModal({selectedTasks, handleDelete, handleModalClose}) {
  
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center text-center">
      <div className="bg-white rounded-xl p-5 w-76 relative">
        <button onClick={handleModalClose} className="absolute top-5 right-5 cursor-pointer"><img src={closeIcon} alt="close icon" /></button>
        <img src={alertIcon} alt="alert icon" className="mx-auto w-10" />
        <p className="mt-3">
         <span className="text-[#027cec] font-semibold">{selectedTasks.length}</span> {selectedTasks.length === 1 ? "task": "tasks"} will be deleted
        </p>
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={handleModalClose}
            className="px-6 py-1 rounded-full text-[#027cec] border border-[#027cec] font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-1 rounded-full text-white bg-[#027cec] border border-[#027cec] font-semibold cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
