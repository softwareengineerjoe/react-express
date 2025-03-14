import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { today } from "../common";
import deleteActive from "../assets/Icons/Delete_active.svg";
import DeleteSubtask from "../components/dialog/DeleteSubTask";
import { getTaskById, updateTask } from "../api/UsersApi"; // API functions
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditTask() {
  const { taskId } = useParams(); // Get the task ID from URL params
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State to store form data
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    priority: "low",
    status: "not started",
    dateCreated: "",
    dueDate: "",
    details: "",
  });

  const [files, setFiles] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubTask, setSelectedSubTask] = useState(null);

  useEffect(() => {
    // Fetch the task by ID
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure the token is available
        const taskData = await getTaskById(taskId, token);
        setTaskDetails(taskData);
        setSubtasks(taskData.subtasks || []);
        setFiles(taskData.attachments || []);
      } catch (err) {
        console.error;
      }
    };

    fetchTask();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // limit to 10MB
      return isValidType && isValidSize;
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleAddSubtask = () => {
    const newSubtask = {
      id: subtaskCount + 1,
      title: `Subtask ${subtaskCount + 1}`,
      status: "not started",
    };
    setSubtasks([...subtasks, newSubtask]);
    setSubtaskCount(subtaskCount + 1); // Increment subtask counter
  };

  const handleTitleChange = (id, newTitle) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, title: newTitle } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, status: newStatus } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedTask = {
        ...taskDetails,
        subtasks,
        attachments: files, // Optional: Attach files to the task if needed
      };

      if (updatedTask.status === "complete" && updatedTask.dueDate) {
        updatedTask.dateCompleted = updatedTask.dueDate; // If task is complete, set the completion date
      }

      await updateTask(taskId, updatedTask, token); // API call to update the task
      navigate("/home"); // Redirect to the home page or task list after saving the task
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Layout title="To-do" subtitle="Edit Task">
      {isModalOpen && (
        <DeleteSubtask
          subTask={selectedSubTask}
          handleDelete={() => {
            setSubtasks((prevSubtasks) =>
              prevSubtasks.filter((task) => task.id !== selectedSubTask.id)
            );
            setSelectedSubTask(null);
            setIsModalOpen(false);
          }}
          handleModalClose={() => setIsModalOpen(false)}
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
                value={taskDetails.priority}
                onChange={handleInputChange}
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
                value={taskDetails.status}
                onChange={handleInputChange}
              >
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
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
              value={taskDetails.title}
              onChange={handleInputChange}
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
                value={taskDetails.dateCreated}
                disabled
                onChange={handleInputChange}
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
                value={taskDetails.dueDate}
                min={today}
                onChange={handleInputChange}
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
              rows="4"
              className="mt-1 block w-full p-2 border border-[#c7ced6] rounded-md"
              value={taskDetails.details}
              onChange={handleInputChange}
              placeholder="Add any further task details here"
            />
          </div>

          {/* File Upload */}
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

              {/* Files Preview */}
              <div className="flex flex-row gap-6 items-center w-full mt-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* File Thumbnail */}
                    {file.type?.startsWith("image/") ? (
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
                        src={deleteActive}
                        alt="Delete file"
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
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </div>

          {/* Subtasks */}
          <div className="relative">
            <div className="flex gap-4 items-center justify-between">
              <h2 className="font-semibold text-lg">Subtasks</h2>
              <button
                onClick={handleAddSubtask}
                className="rounded-full bg-[#027cec] text-white px-5 py-2 flex items-center justify-center w-fit gap-2 cursor-pointer"
              >
                <span>+</span>New Subtask
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              {subtasks.map((subtask) => (
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
                    className="border border-gray-300 rounded-md px-3 py-2 w-full mt-1"
                  >
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="complete">Complete</option>
                  </select>
                  <button
                    onClick={() => handleRemoveSubtask(subtask.id)}
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
        </div>
      </section>
      <div className="flex gap-3 justify-end">
        <Link
          to={"/home"}
          className="rounded-full text-[#027cec] border border-[#027cec] mt-3 px-6 py-1 flex items-center justify-center w-fit gap-2 cursor-pointer"
        >
          Cancel
        </Link>
        <button
          className="rounded-full bg-[#027cec] mt-3 text-white px-6 py-1 flex items-center justify-center w-fit gap-2 cursor-pointer"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </Layout>
  );
}
