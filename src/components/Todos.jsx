import React, { useState } from "react";
import sort from "../assets/Icons/Sort_desktop.svg";
import edit from "../assets/Icons/Edit.svg";

const tasks = [
  {
    id: 1,
    title: "Complete React project - Final Version",
    dueDate: "2025-03-01",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Write blog post on React Hooks and Functional Components",
    dueDate: "2025-03-05",
    priority: "Low",
    status: "Not Started",
  },
  {
    id: 3,
    title: "Plan team meeting - Discuss project timeline and tasks",
    dueDate: "2025-02-28",
    priority: "Critical",
    status: "Complete",
  },
  {
    id: 4,
    title: "Review and merge pull requests",
    dueDate: "2025-03-02",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 5,
    title: "Prepare documentation for new features",
    dueDate: "2025-03-10",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: 6,
    title: "Host weekly sprint review meeting",
    dueDate: "2025-03-03",
    priority: "High",
    status: "Complete",
  },
  {
    id: 7,
    title: "Client presentation preparation - Finalize slides",
    dueDate: "2025-03-07",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 8,
    title: "Conduct user testing for new feature",
    dueDate: "2025-03-08",
    priority: "Critical",
    status: "Not Started",
  },
  {
    id: 9,
    title: "Update project roadmap with new deadlines",
    dueDate: "2025-03-04",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: 10,
    title: "Organize team-building activity for remote employees",
    dueDate: "2025-03-12",
    priority: "Low",
    status: "Complete",
  },
];

export default function Todos() {
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
      const priorityOrder = ["Low", "Medium", "High", "Critical"];
      result =
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    } else if (key === "status") {
      result = a.status.localeCompare(b.status);
    }

    return direction === "asc" ? result : -result;
  });

  return (
    <div className="overflow-hidden rounded-xl shadow-lg border-2 border-[#c7ced6] overflow-y-scroll">
      <table className="min-w-full table-auto bg-white rounded-xl border-separate border-spacing-0">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th className="px-5 py-3 border-b-2 border-[#c7ced6]">
              <input
                type="checkbox"
                onChange={() => {
                  if (selectedTasks.length === tasks.length) {
                    setSelectedTasks([]);
                  } else {
                    setSelectedTasks(tasks.map((task) => task.id));
                  }
                }}
                checked={selectedTasks.length === tasks.length}
              />
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
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                {task.title}
              </td>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                {task.dueDate}
              </td>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                {task.priority}
              </td>
              <td
                className={`px-5 py-3 ${
                  index === sortedTasks.length - 1 ? "" : "border-b-2"
                } border-[#c7ced6]`}
              >
                {task.status}
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
