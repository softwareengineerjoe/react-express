import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import completedIcon from "../assets/Icons/Complete.svg";
import inProgressIcon from "../assets/Icons/InProgress.svg";
import notStartedIcon from "../assets/Icons/NotStarted.svg";
import cancelledIcon from "../assets/Icons/Cancelled.svg";
import { formatStringDate } from "../utils/utils";
import { deleteTask, getTaskById } from "../api/UsersApi";
import deleteIcon from "../assets/Icons/Delete_active.svg";
import editIcon from "../assets/Icons/Edit.svg";
import DeleteModal from "../components/dialog/DeleteModal";

const ViewTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const taskData = await getTaskById(taskId, token);
        setTask(taskData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>Task not found!</div>;
  }

  const getStatusImage = (status) => {
    if (status.toLowerCase() === "complete") {
      return <img src={completedIcon} alt="completed" />;
    } else if (status.toLowerCase() === "in-progress") {
      return <img src={inProgressIcon} alt="in-progress" />;
    } else if (status.toLowerCase() === "not started") {
      return <img src={notStartedIcon} alt="not started" />;
    } else if (status.toLowerCase() === "cancelled") {
      return <img src={cancelledIcon} alt="cancelled" />;
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
      await deleteTask(taskId, token);
      navigate("/home");
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

  const openDeleteModal = () => {
    setIsModalOpen(true); 
  };

  return (
    <Layout title="To-do" subtitle="View Task">
      {isModalOpen && (
        <DeleteModal
          selectedTasks={[task]}
          handleDelete={handleDelete}
          handleModalClose={handleModalClose}
        />
      )}
      <section className="bg-white py-5 px-8 rounded-xl overflow-y-scroll flex flex-col gap-8 h-full">
        <div className="flex items-center gap-6 text-xs w-full">
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
          <span className="flex gap-2 items-center text-gray-600 capitalize">
            {getStatusImage(task.status)}
            {task.status}
            {task.status === "complete" && (
              <>
                {" -"} {formatStringDate(task.dateCompleted)}{" "}
              </>
            )}
          </span>

          <button className="ml-auto cursor-pointer" onClick={openDeleteModal}>
            <img src={deleteIcon} alt="Delete" />
          </button>
          <Link
            to={`/home/view-task/edit-task/${task.id}`}
            className="text-blue-500 cursor-pointer"
          >
            <img src={editIcon} alt="pen icon" />
          </Link>
        </div>
        <div>
          <h2 className="font-bold text-xl capitalize">{task.title}</h2>
          <p className="text-sm text-gray-600">
            {formatStringDate(task.dateCreated)} -{" "}
            {formatStringDate(task.dueDate)}
          </p>
        </div>

        <p>{task.details}</p>

        {/* Render subtasks if they exist */}
        {task.subtasks && task.subtasks.length > 0 && (
          <>
            <div className="border-2 border-[#c7ced6] mt-6 -mb-4" />

            <h3 className="font-bold text-lg">Subtasks</h3>
            <ul>
              {task.subtasks.map((subTask) => (
                <li
                  key={subTask.id}
                  className="flex items-center justify-between text-left"
                >
                  {subTask.title}{" "}
                  <span className="flex gap-2 items-center w-4/6">
                    {getStatusImage(subTask.status)} {subTask.status}
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
