import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiBriefcase, FiLogOut } from "react-icons/fi";
import AuthService from "../services/AuthService";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/");
  };

  // Function to check if the current route matches the given path
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-center mb-4">EMS</h1>
        <nav className="flex flex-col gap-2">
          <Link
            to={user?.ismanager ? "/manager" : "/employee"}
            className={`flex items-center py-2 px-4 hover:bg-gray-800 transition duration-300 ease-in-out ${
              isActiveRoute(user?.ismanager ? "/manager" : "/employee")
                ? "bg-gray-800" // Apply different style for active route
                : ""
            }`}
          >
            <FiHome className="mr-2" /> Home
          </Link>
          {user?.ismanager && (
            <Link
              to="/manager/employees"
              className={`flex items-center py-2 px-4 hover:bg-gray-800 transition duration-300 ease-in-out ${
                isActiveRoute("/manager/employees") ? "bg-gray-800" : ""
              }`}
            >
              <FiUsers className="mr-2" /> Employees
            </Link>
          )}
          {user?.ismanager && (
            <Link
              to="/manager/departments"
              className={`flex items-center py-2 px-4 hover:bg-gray-800 transition duration-300 ease-in-out ${
                isActiveRoute("/manager/departments") ? "bg-gray-800" : ""
              }`}
            >
              <FiBriefcase className="mr-2" /> Departments
            </Link>
          )}
        </nav>
      </div>
      <div className="p-4 mt-auto border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-full w-full hover:bg-red-600 transition duration-300 ease-in-out"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
