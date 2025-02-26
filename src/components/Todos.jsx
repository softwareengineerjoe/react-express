import React, { useState } from "react";
import sort from "../assets/Icons/Sort_desktop.svg";
import edit from "../assets/Icons/Edit.svg";
import deleteActive from "../assets/Icons/Delete_active.svg";
import deleteInactive from "../assets/Icons/Delete_inactive.svg";
import completedIcon from "../assets/Icons/Complete.svg";
import attachmentIcon from "../assets/Icons/attachment.svg";
import inProgressIcon from "../assets/Icons/InProgress.svg";
import notStartedIcon from "../assets/Icons/NotStarted.svg";
import cancelledIcon from "../assets/Icons/Cancelled.svg";
import { formatDate } from "../utils/utils";

const initialTasks = [
  {
    id: 1,
    title: "Complete React project - Final Version",
    dueDate: "2025-03-01",
    priority: "High",
    status: "In Progress",
    hasAttachment: true,
  },
  {
    id: 2,
    title: "Write blog post on React Hooks and Functional Components",
    dueDate: "2025-03-05",
    priority: "Low",
    status: "Cancelled",
    hasAttachment: false,
  },
  {
    id: 3,
    title: "Plan team meeting - Discuss project timeline and tasks",
    dueDate: "2025-02-28",
    priority: "Critical",
    status: "Complete",
    hasAttachment: true,
  },
  {
    id: 4,
    title: "Review and merge pull requests",
    dueDate: "2025-03-02",
    priority: "Low",
    status: "In Progress",
    hasAttachment: false,
  },
  {
    id: 5,
    title: "Prepare documentation for new features",
    dueDate: "2025-03-10",
    priority: "Low",
    status: "Not Started",
    hasAttachment: true,
  },
];

export default function Todos() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const { key, direction } = sortConfig;
    let result = 0;

    if (key === "title") {
      result = a.title.localeCompare(b.title);
    } else if (key === "dueDate") {
      result = new Date(a.dueDate) - new Date(b.dueDate);
    } else if (key === "priority") {
      const priorityOrder = ["Low", "High", "Critical"];
      result =
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    } else if (key === "status") {
      result = a.status.localeCompare(b.status);
    }

    return direction === "asc" ? result : -result;
  });

  const getStatusImage = (status) => {
    if (status === "Complete") {
      return <img src={completedIcon} alt="Completed" />;
    } else if (status === "In Progress") {
      return <img src={inProgressIcon} alt="In Progress" />;
    } else if (status === "Not Started") {
      return <img src={notStartedIcon} alt="Not Started" />;
    } else if (status === "Cancelled") {
      return <img src={cancelledIcon} alt="Cancelled" />;
    }
    return null;
  };

  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !selectedTasks.includes(task.id))
    );
    setSelectedTasks([]);
  };

  return (
    <div className="overflow-hidden rounded-xl shadow-lg border-2 border-[#c7ced6] overflow-y-scroll">
      <table className="min-w-full table-auto bg-white rounded-xl border-separate border-spacing-0">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th className="px-5 py-3 border-b-2 border-[#c7ced6] align-middle">
              <button
                disabled={selectedTasks.length === 0}
                className={`${
                  selectedTasks.length === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer "
                }`}
                onClick={handleDelete}
              >
                <img
                  src={selectedTasks.length > 0 ? deleteActive : deleteInactive}
                  alt="delete icon"
                  className="mx-auto mt-2"
                />
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
          {sortedTasks.map((task, index) => (
            <tr key={task.id}>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6] text-center align-middle`}
              >
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
              </td>

              <td
                className={`px-5 py-3 font-semibold underline ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                <span className="flex items-center gap-4">
                  {task.title}
                  {task.hasAttachment && <img src={attachmentIcon} />}
                </span>
              </td>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                {formatDate(task.dueDate)}
              </td>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded font-semibold ${
                    task.priority === "Low"
                      ? "bg-[#f9fff6] text-[#165700] border-2 border-[#2fbd00]"
                      : task.priority === "High"
                      ? "bg-[#ffdf2] text-[#624d00] border-2 border-[#fac300]"
                      : task.priority === "Critical"
                      ? "bg-[#fff6f] text-[#7f0000] border-2 border-[#eb0000]"
                      : ""
                  }`}
                >
                  {task.priority}
                </span>
              </td>

              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                <span className="flex gap-2 items-center">
                  {getStatusImage(task.status)}
                  {task.status}
                </span>
              </td>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                <button
                  onClick={() => alert(`Edit task with ID: ${task.id}`)}
                  className="text-blue-500 cursor-pointer"
                >
                  <img src={edit} alt="pen icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
