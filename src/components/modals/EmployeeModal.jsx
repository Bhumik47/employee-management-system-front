import React, { useEffect, useState } from "react";
import DepartmentService from "../../services/Department.service";

const EmployeeModal = ({
  isOpen,
  handleClose,
  setUserData,
  onSave,
  userData,
  isEdit,
  editData,
  handleEdit,
}) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    DepartmentService.getDepartments().then((res) => {
      setDepartments(res?.data?.data);
      handleInputChange("department", res?.data?.data[0]?._id);
    });
  }, []);

  useEffect(() => {
    if (isEdit && editData) {
      // If isEdit is true, set initial values to editData
      setUserData(editData);
    }
  }, [isEdit, editData, setUserData]);

  const handleInputChange = (field, value) => {
    console.log("Field:", field);
    console.log("Value:", value);

    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSaveOrEdit = async (e) => {
    if (isEdit) {
      await handleEdit();
    } else {
      await onSave(e);
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full min-h-screen">
          <form className="max-w-3xl m-auto">
            <h2 id="modal-title" className="text-2xl font-semibold mb-4">
              {isEdit ? "Edit Employee" : "Add Employee"}
            </h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={userData.name || ""}
                onChange={(e) =>
                  console.log(e) & handleInputChange("name", e.target.value)
                }
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
                value={userData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            {/* Password */}
            {!isEdit && (
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={userData.password || ""}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </div>
            )}

            {/* Confirm Password */}
            {!isEdit && (
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={userData.confirmPassword || ""}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                />
              </div>
            )}

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={userData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
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
                value={userData.salary || ""}
                onChange={(e) => handleInputChange("salary", e.target.value)}
              />
            </div>

            {/* Department Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-800 text-sm font-semibold mb-2">
                Department
              </label>
              <select
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => {
                  console.log("Dropdown Change Event:", e);
                  handleInputChange("department", e.target.value);
                }}
                value={userData.department}
              >
                {departments?.map((department) => (
                  <option key={department?._id} value={department?._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={handleSaveOrEdit}
              >
                {isEdit ? "Update" : "Save"}
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
