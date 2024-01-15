import React, { useState } from "react";
import EmployeeList from "./common/EmployeeList";

const Departments = () => {
  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Dummy department data
  const [departments, setDepartments] = useState([
    {
      id: 1,
      departmentName: "Engineering",
      description: "Lorem Ipsum",
    },
    // Add more departments as needed
  ]);

  const handleEdit = (departmentId) => {
    // Handle edit action
    console.log(`Edit department with ID ${departmentId}`);
  };

  const handleDelete = (departmentId) => {
    // Handle delete action
    console.log(`Delete department with ID ${departmentId}`);
    // Update state to remove the deleted department
    setDepartments((prevDepartments) =>
      prevDepartments.filter((department) => department.id !== departmentId)
    );
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  return (
    <>
      {show ? (
        <EmployeeList name={"Employess in department"} />
      ) : (
        <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Departments
          </h2>
          <button
            onClick={handleOpen}
            className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out mb-4"
          >
            Add Department
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">No.</th>
                  <th className="py-2 px-4 border-b">Department Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.length > 0 ? (
                  departments.map((department, i) => (
                    <tr
                      key={department.id}
                      className={i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                    >
                      <td className="py-2 px-4 border-b">{i + 1}</td>
                      <td className="py-2 px-4 border-b">
                        {department.departmentName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {department.description}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={() => setShow(true)}
                          className="text-green-500 hover:underline mx-2"
                        >
                          View Employees
                        </button>
                        <button
                          onClick={() => handleEdit(department.id)}
                          className="text-blue-500 hover:underline mx-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(department.id)}
                          className="text-red-500 hover:underline mx-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No Departments
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Departments;
