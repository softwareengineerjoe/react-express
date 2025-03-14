import React, { useState, useEffect, useRef } from "react";
import filterIcon from "../assets/Icons/Filter.svg";
import chipLow from "../assets/Chips/Chip_Low.svg";
import chipHigh from "../assets/Chips/Chip_High.svg";
import chipCritical from "../assets/Chips/Chip_Critical.svg";
import chipNotStarted from "../assets/Chips/Chip_Not-Started.svg";
import chipInProgress from "../assets/Chips/Chip_In-progress.svg";
import chipComplete from "../assets/Chips/Chip_Complete.svg";
import chipCancelled from "../assets/Chips/Chip_Cancelled.svg";
import arrowRight from "../assets/Icons/Accordion_supress.svg";
import { Link } from "react-router-dom";

export default function Filter({ selectedFilters, onFiltersChange }) {
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

  const handleFilterSelect = (filterType, value) => {
    let updatedFilters = { ...selectedFilters };

    // Convert the value to lowercase to ensure case insensitivity
    const lowercasedValue = value.toLowerCase();

    if (filterType === "priority") {
      if (lowercasedValue === "all") {
        updatedFilters.priority = ["low", "high", "critical"]; // Select all priority options
      } else {
        updatedFilters.priority = updatedFilters.priority.includes(lowercasedValue)
          ? updatedFilters?.priority?.filter((item) => item !== lowercasedValue) // Deselect if already selected
          : [...updatedFilters.priority, lowercasedValue];
      }
    } else if (filterType === "status") {
      if (lowercasedValue === "all") {
        updatedFilters.status = [
          "not started",
          "in progress",
          "complete",
          "cancelled",
        ]; // Select all status options
      } else {
        updatedFilters.status = updatedFilters.status.includes(lowercasedValue)
          ? updatedFilters?.status?.filter((item) => item !== lowercasedValue) // Deselect if already selected
          : [...updatedFilters.status, lowercasedValue];
      }
    }
    onFiltersChange(updatedFilters); // Update the filters in the parent
    setIsFilterClicked(false); // Close the filter menu after selecting
  };

  const handleChipRemove = (chipType, value) => {
    const lowercasedValue = value.toLowerCase(); // Ensure value is lowercase
    let updatedFilters = { ...selectedFilters };
    if (chipType === "priority") {
      updatedFilters.priority = updatedFilters.priority.filter(
        (item) => item !== lowercasedValue
      );
    } else if (chipType === "status") {
      updatedFilters.status = updatedFilters.status.filter(
        (item) => item !== lowercasedValue
      );
    }
    onFiltersChange(updatedFilters); // Update the filters in the parent
  };

  // Function to get the chip image corresponding to the filter value
  const getChip = (filter) => {
    switch (filter.toLowerCase()) {  // Convert filter to lowercase here
      case "low":
        return <img src={chipLow} alt="Low Priority" />;
      case "high":
        return <img src={chipHigh} alt="High Priority" />;
      case "critical":
        return <img src={chipCritical} alt="Critical Priority" />;
      case "not started":
        return <img src={chipNotStarted} alt="Not Started Status" />;
      case "in progress":
        return <img src={chipInProgress} alt="In progress Status" />;
      case "complete":
        return <img src={chipComplete} alt="Complete Status" />;
      case "cancelled":
        return <img src={chipCancelled} alt="Cancelled Status" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={filterRef}
      className="bg-white px-5 py-3 rounded-xl flex items-center justify-between border-2 border-[#c7ced6] relative"
    >
      <div className="group">
        <button
          onClick={toggleFilter}
          className="rounded-lg bg-white border border-[#c7ced6] p-2 flex items-center justify-center w-fit gap-2 font-semibold cursor-pointer ease-in duration-150 hover:bg-[#f2f8fd] group-hover:bg-[#f2f8fd]"
        >
          <img src={filterIcon} alt="filter icon" />
          Filter
        </button>

        {isFilterClicked && (
          <ul className="py-2 absolute top-16 left-5 bg-white rounded-xl border border-[#c7ced6] w-40 font-semibold z-20">
            <li
              className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1 group flex items-center justify-between cursor-pointer"
              onClick={togglePriority}
            >
              Priority
              <img src={arrowRight} alt="arrow icon" />
              {isPriorityClicked && (
                <ul className="absolute top-0 left-full translate-x-3 bg-white rounded-xl border border-[#c7ced6] w-40 font-semibold py-2">
                  <li
                    onClick={() => handleFilterSelect("priority", "All")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    All
                  </li>
                  <li
                    onClick={() => handleFilterSelect("priority", "Low")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Low
                  </li>
                  <li
                    onClick={() => handleFilterSelect("priority", "High")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    High
                  </li>
                  <li
                    onClick={() => handleFilterSelect("priority", "Critical")}
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
                    onClick={() => handleFilterSelect("status", "All")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    All
                  </li>
                  <li
                    onClick={() => handleFilterSelect("status", "Not Started")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Not Started
                  </li>
                  <li
                    onClick={() => handleFilterSelect("status", "In Progress")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    In Progress
                  </li>
                  <li
                    onClick={() => handleFilterSelect("status", "Complete")}
                    className="hover:bg-[#f2f8fd] ease-in duration-150 px-4 py-1"
                  >
                    Complete
                  </li>
                  <li
                    onClick={() => handleFilterSelect("status", "Cancelled")}
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

      <div className="mr-auto ml-2 mt-2 flex gap-2">
        {/* Loop selected filters and display chips */}
        {[...selectedFilters.priority, ...selectedFilters.status].map(
          (filter, index) => (
            <button
              key={index}
              className="cursor-pointer -mt-1"
              onClick={() => {
                const type = selectedFilters.priority.includes(filter)
                  ? "priority"
                  : "status";
                handleChipRemove(type, filter);
              }}
            >
              {getChip(filter)}
            </button>
          )
        )}
      </div>

      <Link
        to={"/home/new-task"}
        className="rounded-full bg-[#027cec] text-white px-5 py-2 flex items-center justify-center w-fit gap-2 cursor-pointer"
      >
        <span>+</span>New Task
      </Link>
    </div>
  );
}
