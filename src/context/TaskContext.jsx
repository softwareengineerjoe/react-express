import React, { createContext, useState, useEffect, useContext } from "react";
import { getTasks } from "../api/UsersApi";

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (token) => {
    setLoading(true);
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTasks(token);
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
