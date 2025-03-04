import React from "react";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";
import Signout from "./dialog/Signout";
import { Link, useParams } from "react-router-dom";

export default function Layout({ children, title, subtitle }) {
  const { isSignoutOpen } = useUser();
  const taskId = useParams();
  return (
    <main className="w-full min-h-screen overflow-hidden flex flex-row relative">
      <Signout isOpen={isSignoutOpen} />
      <Sidebar />
      <section className="pr-4 py-4 w-full overflow-hidden">
        <div className="rounded bg-[#f2f8fd] w-full h-full shadow p-4 flex flex-col gap-2 max-h-[95vh]">
          <div className="flex flex-row gap-2 items-center font-semibold mb-3">
            <h2 className={`${subtitle ? "text-[#027cec]" : ""}`}>
              {!subtitle ? (
                title
              ) : (
                <Link to={"/home"} className="cursor-pointer">
                  {"< Back"}
                </Link>
              )}
            </h2>
            {subtitle && subtitle === "Edit" ? (
              <>
                {subtitle && (
                  <>
                    <div className="border border-[#c7ced6] h-5" />
                    <div>
                      <Link
                        to={`/home/view-task/${taskId.taskId}`}
                        className="text-gray-600"
                      >
                        View Task /{" "}
                      </Link>
                      {subtitle}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {subtitle && (
                  <>
                    <div className="border border-[#c7ced6] h-5" />
                    <h2>{subtitle}</h2>
                  </>
                )}
              </>
            )}
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}
