import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import DeleteSubtask from "../components/dialog/DeleteSubTask";
import { useLocation, useParams } from "react-router-dom";
import { mockTasks } from "../common"; // Assuming you're using mock data

export default function EditTask() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [selectedSubTask, setSelectedSubTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subtaskCount, setSubtaskCount] = useState(0);
  const [taskData, setTaskData] = useState(null);
  const [taskNotFound, setTaskNotFound] = useState(false); // New state for handling task not found
  const location = useLocation();
  const { taskId } = useParams();

  // Example task fetching function
  const fetchTaskData = () => {
    const task = mockTasks.find((task) => task.id === parseInt(taskId)); // Find task by ID
    if (task) {
      setTaskData(task);
      setSubtasks(task.subTasks || []);
      setSubtaskCount(task.subTasks.length || 0);
      setTaskNotFound(false); // Task found
    } else {
      setTaskNotFound(true); // Task not found
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [location, taskId]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // limit to 10MB
      return isValidType && isValidSize;
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

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

  const handleRemoveFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleAddSubtask = () => {
    const newSubtask = {
      id: subtaskCount + 1,
      title: `Subtask ${subtaskCount + 1}`,
      status: "not-started", // default status
    };
    setSubtasks([...subtasks, newSubtask]);
    setSubtaskCount(subtaskCount + 1); // Increment subtask counter
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, status: newStatus } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const handleTitleChange = (id, newTitle) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, title: newTitle } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  const handleDelete = () => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((task) => task.id !== selectedSubTask.id)
    );
    setSelectedSubTask(null);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (subtask) => {
    setSelectedSubTask(subtask);
    setIsModalOpen(true);
  };

  // Handle task data save/update (e.g., to API or local storage)
  const handleSaveChanges = () => {
    // Replace with logic to save task data (e.g., API call to save task)
    console.log("Task updated:", {
      title: taskData.title,
      priority: taskData.priority,
      status: taskData.status,
      dueDate: taskData.dueDate,
      subtasks,
      files,
    });
  };

  if (taskNotFound) {
    return <div>Task not found</div>; // Show task not found message
  }

  if (!taskData) {
    return <div>Loading...</div>; // Show loading while task is fetched
  }

  return (
    <Layout title="To-do" subtitle="Edit">
      {isModalOpen && (
        <DeleteSubtask
          subTask={selectedSubTask}
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
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({ ...taskData, priority: e.target.value })
                }
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
                value={taskData.status}
                onChange={(e) =>
                  setTaskData({ ...taskData, status: e.target.value })
                }
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
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
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
                value={taskData.dateCreated}
                onChange={(e) =>
                  setTaskData({ ...taskData, dateCreated: e.target.value })
                }
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
                value={taskData.dueDate}
                onChange={(e) =>
                  setTaskData({ ...taskData, dueDate: e.target.value })
                }
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
              value={taskData.details}
              onChange={(e) =>
                setTaskData({ ...taskData, details: e.target.value })
              }
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex gap-3 justify-end">
        <button
          className="rounded-full text-[#027cec] border border-[#027cec] mt-6 px-6 py-1 flex items-center justify-center w-fit gap-2 cursor-pointer"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          className="rounded-full bg-[#027cec] mt-6 text-white px-6 py-1 flex items-center justify-center w-fit gap-2 cursor-pointer"
          onClick={handleSaveChanges}
        >
          Save
        </button>
      </div>
    </Layout>
  );
}
