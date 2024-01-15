import React, { useState } from "react";
import EmployeeModal from "../EmployeeModal";
import ProfileModal from "../ProfileModal";

const EmployeeList = ({ name, employee }) => {
  const [isOpen, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [filterType, setFilterType] = useState("name"); // Default filter type
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileOpen = () => {
    setOpenProfile(true);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  // Dummy employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      salary: 80000,
      date: "2022-01-01",
    },
    // Add more employees as needed
  ]);

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    salary: 0,
    date: "",
  });

  const handleEdit = (employeeId) => {
    // Handle edit action
    console.log(`Edit employee with ID ${employeeId}`);
  };

  const handleDelete = (employeeId) => {
    // Handle delete action
    console.log(`Delete employee with ID ${employeeId}`);
    // Update state to remove the deleted employee
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleAddEmployee = () => {
    // Handle add employee action
    console.log("Add new employee:", newEmployee);
    // Generate a unique ID for the new employee
    const newEmployeeWithId = { id: Date.now(), ...newEmployee };
    // Update state to add the new employee
    setEmployees((prevEmployees) => [...prevEmployees, newEmployeeWithId]);
    // Clear the form
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      salary: 0,
      date: "",
    });
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  // Apply filters based on selected filter type and sort order
  const filteredEmployees = employees.sort((a, b) => {
    const nameA =
      filterType === "name" ? `${a.firstName} ${a.lastName}` : a.email;
    const nameB =
      filterType === "name" ? `${b.firstName} ${b.lastName}` : b.email;

    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleOpen}
          className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out mb-4"
        >
          Add Employee
        </button>
        <div className="flex space-x-4 items-center">
          {/* Filter Dropdowns */}
          <div className="relative">
            <label className="text-gray-600 mr-2">Filter by:</label>
            <select
              className="border p-2 rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option className="py-2">Name</option>
              <option className="py-2">Location</option>
            </select>
          </div>

          <div className="relative">
            <label className="text-gray-600 mr-2">Sort order:</label>
            <select
              className="border p-2 rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option className="py-2">Ascending</option>
              <option className="py-2">Descending</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button
         
            className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Salary</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, i) => (
                <tr
                  key={employee.id}
                  className={i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                >
                  <td className="py-2 px-4 border-b">{i + 1}</td>
                  <td className="py-2 px-4 border-b">{employee.firstName}</td>
                  <td className="py-2 px-4 border-b">{employee.lastName}</td>
                  <td className="py-2 px-4 border-b">{employee.email}</td>
                  <td className="py-2 px-4 border-b">
                    {formatter.format(employee.salary)}
                  </td>
                  <td className="py-2 px-4 border-b">{employee.date}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={handleProfileOpen}
                      className="text-green-500 hover:underline mx-2"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleEdit(employee.id)}
                      className="text-blue-500 hover:underline mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-500 hover:underline mx-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No Employees
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProfileModal
        name={"Employee Profile"}
        open={openProfile}
        handleProfileClose={handleProfileClose}
      />
      <EmployeeModal isOpen={isOpen} handleClose={handleClose} />
    </div>
  );
};

export default EmployeeList;
