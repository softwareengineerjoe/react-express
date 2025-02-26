import React from "react";
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import Todos from "../components/Todos";

export default function Dashboard() {
  return (
    <Layout title="To-do">
      <Filter />
      <Todos />
    </Layout>
  );
}
