import React, { useState, useEffect, useRef } from "react";
import filter from "../assets/Icons/Filter.svg";
import arrowRight from "../assets/Icons/Accordion_supress.svg";

export default function Filter() {
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isPriorityClicked, setIsPriorityClicked] = useState(false);
  const [isStatusClicked, setIsStatusClicked] = useState(false);

  const filterRef = useRef(null); // Reference for the filter component

  // Close the filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterClicked(false); // Close filter if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, []);

  const toggleFilter = () => setIsFilterClicked((prev) => !prev);

  const togglePriority = () => {
    setIsPriorityClicked((prev) => !prev);
    setIsStatusClicked(false);
  };

  const toggleStatus = () => {
    setIsStatusClicked((prev) => !prev);
    setIsPriorityClicked(false);
  };

  return (
    <div
      ref={filterRef} // Attach the ref to the filter container
      className="bg-white px-5 py-3 rounded-xl flex items-center justify-between border-2 border-[#c7ced6] relative"
    >
      <div className="group">
        <button
          onClick={toggleFilter}
          className="rounded-lg bg-white border border-[#c7ced6] p-2 flex items-center justify-center w-fit gap-2 font-semibold cursor-pointer ease-in duration-150 hover:bg-[#f2f8fd] group-hover:bg-[#f2f8fd]"
        >
          <img src={filter} alt="filter icon" />
          Filter
        </button>

        {isFilterClicked && (
          <ul className="py-2 absolute top-16 left-5 bg-white rounded-xl border border-[#c7ced6] w-40 font-semibold">
            <li
              className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1 group flex items-center justify-between cursor-pointer"
              onClick={togglePriority}
            >
              Priority
              <img src={arrowRight} alt="arrow icon" />
              {isPriorityClicked && (
                <ul className="absolute top-0 left-full translate-x-3 bg-white rounded-xl border border-[#c7ced6] w-40 font-semibold py-2">
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    All
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Low
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    High
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Critical
                  </li>
                </ul>
              )}
            </li>

            <li
              className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1 group flex items-center justify-between cursor-pointer"
              onClick={toggleStatus}
            >
              Status
              <img src={arrowRight} alt="arrow icon" />
              {isStatusClicked && (
                <ul className="absolute top-0 left-full translate-x-3 bg-white rounded-xl border border-[#c7ced6] w-40 font-semibold py-2">
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    All
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Not Started
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    In Progress
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Complete
                  </li>
                  <li
                    onClick={() => {
                      setIsFilterClicked(false);
                    }}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Cancelled
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </div>

      <button className="rounded-full bg-[#027cec] text-white px-5 py-2 flex items-center justify-center w-fit gap-4 cursor-pointer">
        <span>+</span> New Task
      </button>
    </div>
  );
}
