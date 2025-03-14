import React, { useState } from "react";
import { Link } from "react-router-dom";
import sort from "../assets/Icons/Sort_desktop.svg";
import attachmentIcon from "../assets/Icons/attachment.svg";
import completedIcon from "../assets/Icons/Complete.svg";
import inProgressIcon from "../assets/Icons/InProgress.svg";
import notStartedIcon from "../assets/Icons/NotStarted.svg";
import cancelledIcon from "../assets/Icons/Cancelled.svg";
import deleteInactive from "../assets/Icons/Delete_inactive.svg";
import deleteActive from "../assets/Icons/Delete_active.svg";
import accordionSupress from "../assets/Icons/Accordion_supress.svg";
import accordionExpand from "../assets/Icons/Accordion_expand.svg";
import edit from "../assets/Icons/Edit.svg";
import { formatDate } from "../utils/utils";
import DeleteModal from "./dialog/DeleteModal";
import { deleteTask } from "../api/UsersApi";

export default function Todos({ tasks, setTasks, selectedFilters }) {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });

  const [expandedTasks, setExpandedTasks] = useState({});

  const toggleSubTasks = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    // Filter by priority
    if (
      selectedFilters?.priority?.length > 0 &&
      !selectedFilters?.priority?.includes(task.priority.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (
      selectedFilters?.status?.length > 0 &&
      !selectedFilters?.status?.includes(task.status.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Handle checkbox change
  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // Sorting the tasks based on the selected key and direction
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const { key, direction } = sortConfig;
    let result = 0;

    if (key === "title") {
      result = a.title.localeCompare(b.title);
    } else if (key === "dueDate") {
      result = new Date(a.dueDate) - new Date(b.dueDate);
    } else if (key === "priority") {
      const priorityOrder = ["low", "high", "critical"];
      result =
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    } else if (key === "status") {
      result = a.status.localeCompare(b.status);
    }

    return direction === "asc" ? result : -result;
  });

  const getStatusImage = (status) => {
    if (status === "complete") {
      return (
        <img
          src={completedIcon}
          alt="completed"
        />
      );
    } else if (status === "in progress") {
      return (
        <img
          src={inProgressIcon}
          alt="in progress"
        />
      );
    } else if (status === "not started") {
      return (
        <img
          src={notStartedIcon}
          alt="not started"
        />
      );
    } else if (status === "cancelled") {
      return (
        <img
          src={cancelledIcon}
          alt="cancelled"
        />
      );
    }
    return null;
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const deletedTaskIds = [];

      for (const taskId of selectedTasks) {
        await deleteTask(taskId, token);
        deletedTaskIds.push(taskId);
      }

      setTasks((prevTasks) =>
        prevTasks.filter((task) => !deletedTaskIds.includes(task.id))
      );

      setSelectedTasks([]);
      setIsModalOpen(false);

      console.log("Tasks deleted successfully");
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-hidden rounded-xl shadow-lg border-2 border-[#c7ced6] overflow-y-scroll">
      {isModalOpen && (
        <DeleteModal
          selectedTasks={selectedTasks}
          handleDelete={handleDelete}
          handleModalClose={handleModalClose}
        />
      )}

      <table className="min-w-full table-auto bg-white rounded-xl border-separate border-spacing-0">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th className="px-5 py-3 border-b-2 border-[#c7ced6] align-middle">
              <button
                disabled={selectedTasks?.length === 0}
                className={`${
                  selectedTasks?.length === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer "
                } ${
                  selectedTasks?.length > 0
                    ? "flex items-center justify-center gap-2 border-2 border-[#c7ced6] p-2 rounded mx-auto"
                    : ""
                }`}
                onClick={handleDeleteClick}
              >
                <img
                  src={selectedTasks?.length > 0 ? deleteActive : deleteInactive}
                  alt="delete icon"
                  className={`${
                    selectedTasks?.length > 0 ? "" : "mt-2 mx-auto"
                  }`}
                />
                {selectedTasks?.length > 0 && (
                  <p className="py-0.5 px-2 rounded-full bg-[#62c6ff] text-white text-xs font-semibold">
                    {selectedTasks.length}
                  </p>
                )}
              </button>
            </th>
            <th
              className="px-5 py-3 cursor-pointer border-b-2 border-[#c7ced6] text-left"
              onClick={() => handleSort("title")}
            >
              <span className="flex gap-2">
                Title <img src={sort} alt="sort icon" />
              </span>
            </th>
            <th
              className="px-5 py-3 cursor-pointer border-b-2 border-[#c7ced6] text-left"
              onClick={() => handleSort("dueDate")}
            >
              <span className="flex gap-2">
                Due Date <img src={sort} alt="sort icon" />
              </span>
            </th>
            <th
              className="px-5 py-3 cursor-pointer border-b-2 border-[#c7ced6] text-left"
              onClick={() => handleSort("priority")}
            >
              <span className="flex gap-2">
                Priority <img src={sort} alt="sort icon" />
              </span>
            </th>
            <th
              className="px-5 py-3 cursor-pointer border-b-2 border-[#c7ced6] text-left"
              onClick={() => handleSort("status")}
            >
              <span className="flex gap-2">
                Status <img src={sort} alt="sort icon" />
              </span>
            </th>
            <th className="px-5 py-3 border-b-2 border-[#c7ced6]"></th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks?.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 text-gray-500 font-semibold"
              >
                No tasks available
              </td>
            </tr>
          ) : (
            sortedTasks.map((task, index) => (
              <React.Fragment key={task.id}>
                {/* Task Row */}
                <tr>
                  <td className="px-5 py-3 border-b-2 border-[#c7ced6] text-center">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => handleCheckboxChange(task.id)}
                      className="w-5 h-5 border-2 border-[#c7ced6] rounded-md transition-colors duration-200 peer checked:bg-[#62c6ff] checked:border-[#62c6ff]"
                    />
                  </td>
                  <td className="px-5 py-3 font-semibold underline border-b-2 border-[#c7ced6]">
                    <span className="flex items-center gap-4">
                      {task?.subtasks &&
                        Array.isArray(task?.subtasks) &&
                        task?.subtasks?.length > 0 && (
                          <img
                            src={
                              expandedTasks[task.id]
                                ? accordionExpand
                                : accordionSupress
                            }
                            alt="accordion"
                            onClick={() => toggleSubTasks(task.id)}
                            className="cursor-pointer"
                          />
                        )}
                      <Link
                        to={`/home/view-task/${task.id}`}
                        className="capitalize"
                      >
                        {task.title}
                      </Link>
                      {task.attachments?.length > 0 && (
                        <img src={attachmentIcon} alt="attachment icon" />
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3 border-b-2 border-[#c7ced6]">
                    {formatDate(task.dueDate)}
                  </td>
                  <td
                    className={`px-5 py-3 border-b-2 border-[#c7ced6] ${
                      index === sortedTasks?.length - 1 ? "" : "border-b-2"
                    }`}
                  >
                    <span
                      className={`inline-block px-2 py-1 rounded font-semibold capitalize ${
                        task.priority === "low"
                          ? "bg-[#f9fff6] text-[#165700] border-2 border-[#2fbd00]"
                          : task.priority === "high"
                          ? "bg-[#ffdf2] text-[#624d00] border-2 border-[#fac300]"
                          : task.priority === "critical"
                          ? "bg-[#fff6f] text-[#7f0000] border-2 border-[#eb0000]"
                          : ""
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3 border-b-2 border-[#c7ced6]">
                    <span className="flex items-center gap-2 capitalize">
                      {getStatusImage(task.status)}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 border-b-2 border-[#c7ced6]">
                    <Link
                      to={`/home/view-task/edit-task/${task.id}`}
                      className="text-blue-500 cursor-pointer"
                    >
                      <img src={edit} alt="pen icon" />
                    </Link>
                  </td>
                </tr>

                {/* Expanded Subtask Rows */}
                {expandedTasks[task.id] &&
                  task?.subtasks &&
                  Array.isArray(task?.subtasks) &&
                  task?.subtasks?.length > 0 &&
                  task?.subtasks.map((subTask) => (
                    <tr key={subTask.id}>
                      <td className="px-5 py-3 border-b-2 border-[#c7ced6]"></td>
                      <td className="px-5 py-3 border-b-2 border-[#c7ced6] indent-18 capitalize">
                        {subTask.title}
                      </td>
                      <td className="px-5 py-3 border-b-2 border-[#c7ced6]"></td>
                      <td className="px-5 py-3 border-b-2 border-[#c7ced6]"></td>
                      <td className="px-5 py-3 border-b-2 border-[#c7ced6]">
                        <span className="flex items-center gap-2 ml-6 capitalize">
                          {getStatusImage(subTask.status)}
                          {subTask.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 border-b-2 border-[#c7ced6]"></td>
                    </tr>
                  ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
