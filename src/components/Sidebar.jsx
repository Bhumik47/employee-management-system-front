// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiBriefcase, FiLogOut } from "react-icons/fi";
import AuthService from "../services/AuthService";

const Sidebar = ({user}) => {

  const handleLogout = async () => {
    await AuthService.logout()
  }
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-4">EMS</h1>
        <nav>
          <Link
            to="/"
            className="flex items-center py-2 px-4 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            <FiHome className="mr-2" /> Home
          </Link>
          {user?.ismanager && <Link
            to="/employees"
            className="flex items-center py-2 px-4 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            <FiUsers className="mr-2" /> Employees
          </Link>}
          {user?.ismanager && <Link
            to="/departments"
            className="flex items-center py-2 px-4 hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            <FiBriefcase className="mr-2" /> Departments
          </Link>}
        </nav>
      </div>
      <div className="p-4 mt-auto border-t border-gray-800">
        <button onClick={handleLogout} className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-full w-full hover:bg-red-600 transition duration-300 ease-in-out">
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
