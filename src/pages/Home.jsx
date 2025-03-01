import React from "react";
import Layout from "../components/Layout";
import Filter from "../components/Filter";
import Todos from "../components/Todos";

export default function Home() {
  return (
    <Layout title="To-do">
      <Filter />
      <Todos />
    </Layout>
  );
}
