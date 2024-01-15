// EmployeeModal.js

import React from "react";

const EmployeeModal = ({ isOpen, handleClose, onChange, onSave }) => {
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <form className="max-w-3xl m-auto">
            <h2 id="modal-title" className="text-2xl font-semibold mb-4">
              Add Employee
            </h2>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("password", e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("confirmPassword", e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("address", e.target.value)}
              />
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Salary
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("salary", e.target.value)}
              />
            </div>

            {/* Department Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Department
              </label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => onChange("department", e.target.value)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                {/* Add more departments as needed */}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={onSave}
              >
                Save
              </button>
              <button
                type="button"
                className="ml-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
