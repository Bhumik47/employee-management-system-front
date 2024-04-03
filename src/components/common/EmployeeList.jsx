import React, { useEffect, useState } from "react";
import EmployeeModal from "../modals/EmployeeModal";
import ProfileModal from "../ProfileModal";
import AuthService from "../../services/AuthService";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

const EmployeeList = ({
  getDepartments,
  department,
  name,
  setShow,
  employees,
  getAllUsers,
}) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [userData, setUserData] = useState({});

  const [isOpen, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [filterType, setFilterType] = useState("name"); // Default filter type
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState({});

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long", // Specify "long" for the full month name
      day: "numeric",
    };

    return dateObject.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleOpen = (editData) => {
    setEditData(editData);
    setEdit(!!editData); // Set isEdit to true if editData is provided
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileOpen = (employee) => {
    setSelectedProfile(employee);
    setOpenProfile(true);
  };

  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmployee = async (e) => {
    e.preventDefault();

    // Email validation check
    if (!validateEmail(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password match check
    if (userData.password !== userData.confirmPassword) {
      toast.error("Confirm Password do not match");
      return;
    }

    try {
      const response = await AuthService.addEmployee(userData);

      if (response.status === 201) {
        if (department) {
          await getDepartments();
        } else {
          await getAllUsers();
        }
        toast.success(response.data.message);
        handleClose();
      } else {
        console.error("Error submitting form:", response.error);
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error submitting form:", error.message);
      handleClose();
    }
  };

  const handleEdit = async () => {
    // Email validation check
    if (!validateEmail(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await AuthService.editEmployee(userData);
      if (response.status === 201) {
        if (department) {
          await getDepartments();
        } else {
          await getAllUsers();
        }
        toast.success(response.data.message);
        handleClose();
      } else {
        console.error("Error submitting form:", response.error);
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error submitting form:", error.message);
      handleClose();
    }
  };

  const handleFilter = async () => {
    const res = await AuthService.filterEmployees({
      sortBy: filterType,
      sortOrder: sortOrder,
    });

    setFilteredEmployees(res.data.data);
  };

  const handleDelete = async (employeeId) => {
    const res = await AuthService.deleteEmployee(employeeId);
    if (department) {
      await getDepartments();
    } else {
      await getAllUsers();
    }
    toast.success(res.data.message);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
        {department && (
          <button
            onClick={() => setShow(false)}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-full"
          >
            <IoArrowBack className="mr-2" />
            Back
          </button>
        )}
      </div>
      {!department && (
        <div className="flex justify-between">
          <button
            onClick={() => {
              setUserData({});
              handleOpen();
            }}
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
                <option value="name" className="py-2">
                  Name
                </option>
                <option value="address" className="py-2">
                  Location
                </option>
              </select>
            </div>

            <div className="relative">
              <label className="text-gray-600 mr-2">Sort order:</label>
              <select
                className="border p-2 rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc" className="py-2">
                  Ascending
                </option>
                <option value="desc" className="py-2">
                  Descending
                </option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Salary</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees?.length > 0 ? (
              filteredEmployees?.map((employee, i) => (
                <tr
                  key={employee._id}
                  className={i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                >
                  <td className="py-2 px-4 border-b">{i + 1}</td>
                  <td className="py-2 px-4 border-b">{employee.name}</td>

                  <td className="py-2 px-4 border-b">{employee.email}</td>

                  <td className="py-2 px-4 border-b">{employee.address}</td>
                  <td className="py-2 px-4 border-b">
                    {formatter.format(employee.salary)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(employee.createdAt)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleProfileOpen(employee)}
                      className="text-green-500 hover:underline mx-2"
                    >
                      View Profile
                    </button>
                    {!department && (
                      <button
                        onClick={() => handleOpen(employee)}
                        className="text-blue-500 hover:underline mx-2"
                      >
                        Edit
                      </button>
                    )}
                    {!department && (
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="text-red-500 hover:underline mx-2"
                      >
                        Delete
                      </button>
                    )}
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
        handleOpen={handleOpen}
        employeeData={selectedProfile}
        department={department}
      />
      <EmployeeModal
        userData={userData}
        setUserData={setUserData}
        isOpen={isOpen}
        handleClose={handleClose}
        onSave={addEmployee}
        isEdit={isEdit}
        editData={isEdit ? editData : null}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default EmployeeList;
