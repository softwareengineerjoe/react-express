import React from "react";
import logo from "../assets/LogoHeader.svg";
import avatar from "../assets/Icons/Avatar.svg";
import home from "../assets/Icons/Home.svg";
import signOut from "../assets/Icons/Signout.svg";
import { useUser } from "../context/UserContext";

export default function Sidebar() {
  const { isSignoutOpen, toggleSignout } = useUser();
  return (
    <section className="min-h-screen p-4 max-w-2xs w-full">
      <img src={logo} alt="logo" />
      <div className="w-full border-b-2 border-[#c7ced6]" />

      <img src={avatar} alt="avatar logo" className="w-16 mx-auto mt-6" />
      <h1 className="text-center text-xl">John Doe_456</h1>

      <div className="mt-6">
        <button className="px-3 py-2 flex flex-row items-center gap-4 hover:bg-[#f2f8fd] w-full rounded ease-in duration-150 cursor-pointer">
          <img src={home} />
          Home
        </button>
        <button
          onClick={toggleSignout}
          className="px-3 py-2 flex flex-row items-center gap-4 hover:bg-[#f2f8fd] w-full rounded ease-in duration-150 cursor-pointer"
        >
          <img src={signOut} />
          Sign out
        </button>
      </div>
    </section>
  );
}