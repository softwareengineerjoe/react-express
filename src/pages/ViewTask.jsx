import React from "react";
import { useParams } from "react-router-dom";
import { mockTasks } from "../common";
import Layout from "../components/Layout";
import completedIcon from "../assets/Icons/Complete.svg";
import inProgressIcon from "../assets/Icons/InProgress.svg";
import notStartedIcon from "../assets/Icons/NotStarted.svg";
import cancelledIcon from "../assets/Icons/Cancelled.svg";
import { formatStringDate } from "../utils/utils";

const ViewTask = () => {
  const { taskId } = useParams();
  const task = mockTasks.find((task) => task.id === parseInt(taskId));

  if (!task) {
    return <div>Task not found!</div>;
  }

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

  return (
    <Layout title="To-do" subtitle="View Task">
      <section className="bg-white py-5 px-8 rounded-xl overflow-y-scroll flex flex-col gap-8 h-full">
        <div className="flex items-center gap-6 text-xs">
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
          <span className="flex gap-2 items-center text-gray-600">
            {getStatusImage(task.status)}
            {task.status}
            {task.status === "Complete" && (
              <>
                {" -"} {formatStringDate(task.dateCompleted)}{" "}
              </>
            )}
          </span>
        </div>
        <div>
          <h2 className="font-bold text-xl">{task.title}</h2>
          <p className="text-sm text-gray-600">
            {formatStringDate(task.dateCreated)} -{" "}
            {formatStringDate(task.dueDate)}
          </p>
        </div>

        <p>{task.details}</p>

        <div className="border-2 border-[#c7ced6] mt-6 -mb-4" />

        {/* Render subtasks if they exist */}
        {task.subTasks && task.subTasks.length > 0 && (
          <>
            <h3 className="font-bold text-lg">Subtask</h3>
            <ul>
              {task.subTasks.map((subTask) => (
                <li
                  key={subTask.id}
                  className="flex items-center justify-between text-left"
                >
                  {subTask.title}{" "}
                  <span className="flex gap-2 items-center w-4/6">
                    {getStatusImage(task.status)}
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </Layout>
  );
};

export default ViewTask;
