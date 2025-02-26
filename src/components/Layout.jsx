import React from "react";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";
import Signout from "./dialog/Signout";

export default function Layout({ children, title }) {
  const { isSignoutOpen } = useUser();

  return (
    <main className="w-full min-h-screen overflow-hidden flex flex-row relative">
      <Signout isOpen={isSignoutOpen} />
      <Sidebar />
      <section className="pr-4 py-4 w-full">
        <div className="rounded bg-[#f2f8fd] w-full h-full shadow p-4">
          <h2 className="font-semibold">{title}</h2>

          {children}
        </div>
      </section>
    </main>
  );
}
