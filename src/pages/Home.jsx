import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import Todos from "../components/Todos";
import { useTasks } from "../context/TaskContext";
import { getTasks } from "../api/UsersApi";

export default function Home() {
  const { tasks, setTasks } = useTasks();
  const [selectedFilters, setSelectedFilters] = useState({
    priority: [],
    status: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found!");
          return;
        }

        const tasksData = await getTasks(token);

        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  console.log(tasks);
  return (
    <Layout title="To-do">
      <Filter
        selectedFilters={selectedFilters}
        onFiltersChange={handleFiltersChange}
      />
      <Todos
        selectedFilters={selectedFilters}
        tasks={tasks}
        setTasks={setTasks}
      />
    </Layout>
  );
}
