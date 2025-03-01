import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import closeIcon from "../assets/Icons/Close.svg";
import deleteActive from "../assets/Icons/Delete_active.svg";
import DeleteSubtask from "../components/dialog/DeleteSubTask";
import { mockTasks } from "../common"; // Mock tasks

export default function NewTask() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [subtasks, setSubtasks] = useState(mockTasks[0]?.subTasks || []); // Initialize using the first task's subTasks
  const [selectedSubTask, setSelectedSubTask] = useState(null); // Track selected subtask
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subtaskCount, setSubtaskCount] = useState(
    mockTasks[0]?.subTasks.length || 0
  ); // Initialize count based on the first task's subTasks length

  // Handle file change when a user selects files
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // limit to 10MB
      return isValidType && isValidSize;
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handle drag-and-drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Handle removing a file
  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  // Handle adding a subtask
  const handleAddSubtask = () => {
    const newSubtask = {
      id: subtaskCount + 1,
      title: `Subtask ${subtaskCount + 1}`,
      status: "not-started", // default status
    };
    setSubtasks([...subtasks, newSubtask]);
    setSubtaskCount(subtaskCount + 1); // Increment subtask counter
  };

  // Handle removing a subtask
  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  // Handle status change of a subtask
  const handleStatusChange = (id, newStatus) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, status: newStatus } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  // Handle title change of a subtask
  const handleTitleChange = (id, newTitle) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, title: newTitle } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  // Handle deletion of selected subtasks
  const handleDelete = () => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((task) => task.id !== selectedSubTask.id)
    );
    setSelectedSubTask(null); // Clear the selected subtask after deletion
    setIsModalOpen(false); // Close modal after deletion
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle delete click to open the modal and set selected subtask
  const handleDeleteClick = (subtask) => {
    setSelectedSubTask(subtask);
    setIsModalOpen(true);
  };

  return (
    <Layout title="To-do" subtitle="New Task">
      {isModalOpen && (
        <DeleteSubtask
          subTask={selectedSubTask} // Pass selected subtask to the modal
          handleDelete={handleDelete}
          handleModalClose={handleModalClose}
        />
      )}
      <section className="bg-white p-5 rounded-xl overflow-y-scroll">
        <div className="max-w-3xl w-full flex flex-col gap-4 mx-auto text-sm">
          {/* Priority and Status Fields */}
          <div className="flex gap-4 w-fit">
            <div className="relative w-46">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
              >
                Priority
              </label>
              <select
                name="priority"
                id="priority"
                className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              >
                <option value="high">High</option>
                <option value="low">Low</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="relative w-56">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="cancelled">Cancelled</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="relative">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
            >
              Title
            </label>
            <textarea
              id="title"
              name="title"
              rows="3"
              className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              placeholder="Enter task title"
            />
          </div>

          {/* Date Created and Due Date */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label
                htmlFor="dateCreated"
                className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
              >
                Date Created
              </label>
              <input
                type="date"
                id="dateCreated"
                name="dateCreated"
                className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              />
            </div>

            <div className="relative flex-1">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              />
            </div>
          </div>

          {/* Details */}
          <div className="relative">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
            >
              Details
            </label>
            <textarea
              id="details"
              name="details"
              rows="3"
              className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              placeholder="Enter task details"
            />
          </div>

          {/* Attachments */}
          <div className="relative">
            <label
              htmlFor="attachments"
              className="block text-sm font-medium text-[#c7ced6] absolute left-3 top-0 -translate-y-0.5 text-xs bg-white px-1"
            >
              Attachments
            </label>

            {/* Drop area for drag-and-drop */}
            <div
              className="mt-1 block w-full p-4 border border-[#c7ced6] rounded-md h-52 border-dotted flex flex-col justify-center items-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <span className="text-gray-500 text-sm">
                Drop file to attach, or{" "}
                <span className="text-blue-500 cursor-pointer">browse</span>
              </span>

              <div className="flex flex-row gap-6 items-center w-full mt-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* File Thumbnail */}
                    {file.type.startsWith("image/") ? (
                      <div className="h-24 w-20 mt-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover bg-gray-100 border"
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-20 mt-2 bg-gray-200 flex justify-center items-center text-sm text-gray-500 break-words overflow-hidden text-xs p-2 border">
                        <span>{file.name}</span>
                      </div>
                    )}

                    {/* File Name and File Size */}
                    <div className="text-xs overflow-hidden break-words">
                      <p className="underline text-ellipsis whitespace-nowrap overflow-hidden">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {file.size > 1024
                          ? (file.size / 1024).toFixed(2) + " MB"
                          : file.size + " bytes"}
                      </p>
                    </div>

                    {/* Close Button to Remove File */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(file);
                      }}
                      className="absolute -translate-y-3 translate-x-2 top-0 right-0 p-0.5 bg-white rounded-full text-[#c7ced6] border-[#c7ced6] border cursor-pointer"
                    >
                      <img
                        src={closeIcon}
                        alt="closeIcon"
                        className="w-2 h-2"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              id="attachments"
              name="attachments"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Divider */}
          <div className="border-b-2 border-[#c7ced6] w-full mt-6 mb-2" />

          {/* Subtask */}
          <div className="flex gap-4 items-center justify-between">
            <h2 className="font-semibold text-lg">Subtask</h2>
            <button
              onClick={handleAddSubtask}
              className="rounded-full bg-[#027cec] text-white px-5 py-2 flex items-center justify-center w-fit gap-2 cursor-pointer"
            >
              <span>+</span>New Subtask
            </button>
          </div>

          {/* Render Subtasks */}
          <div className="mt-4">
            {subtasks.map((subtask, index) => (
              <div key={subtask.id} className="flex items-center gap-2 mt-2">
                <div className="w-full">
                  <input
                    type="text"
                    value={subtask.title}
                    onChange={(e) =>
                      handleTitleChange(subtask.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1"
                  />
                </div>
                <select
                  value={subtask.status}
                  onChange={(e) =>
                    handleStatusChange(subtask.id, e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 w-72"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>

                <button
                  onClick={() => handleDeleteClick(subtask)} // Pass subtask to delete function
                  className="ml-4 cursor-pointer"
                >
                  <img
                    src={deleteActive}
                    alt="delete icon"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
