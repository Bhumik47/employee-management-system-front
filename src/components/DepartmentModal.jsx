import React, { useState, useEffect } from "react";
import DepartmentService from "../services/Department.service";
import toast from "react-hot-toast";

const DepartmentModal = ({
  isOpen,
  handleClose,
  setDepartments,
  isEdit,
  editData,
}) => {
  const [departmentName, setDepartmentName] = useState(editData?.name || "");
  console.log(isEdit,editData)

  useEffect(() => {
    // If in edit mode, populate the form with existing data
    if (isEdit) {
      setDepartmentName(editData?.name || "");
    }
  }, [isEdit, editData]);

  const handleSave = async () => {
    try {
      if (isEdit) {
        // Handle edit action
        await DepartmentService.UpdateDepartment({
          _id: editData._id,
          name: departmentName,
        });
      } else {
        // Handle add action
        await DepartmentService.addDepartment({ name: departmentName });
      }

      // Fetch updated departments and update state
      const departments = await DepartmentService.getDepartments();
      setDepartments(departments.data.data);

      toast.success(`${isEdit ? "Updated" : "Added"} successfully`);
      setDepartmentName("");
      handleClose();
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to save. Please try again.");
    }
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        {/* Dimmed Background Overlay */}
        <div
          className={`fixed inset-0 bg-black opacity-50 ${
            isOpen ? "" : "hidden"
          }`}
          onClick={handleClose} // Close the modal if the overlay is clicked
        ></div>

        <div className="bg-white p-8 rounded-lg shadow-lg z-10">
          <h2 id="modal-title" className="text-2xl font-semibold mb-4">
            Add Department
          </h2>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2">
              Department Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
              onClick={handleSave}
            >
              Add Department
            </button>
            <button
              type="button"
              className="ml-2 text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;
