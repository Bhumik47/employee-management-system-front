import React, { useEffect, useState } from "react";
import EmployeeList from "./common/EmployeeList";
import DepartmentModal from "./DepartmentModal";
import DepartmentService from "../services/Department.service";
import toast from "react-hot-toast";

const Departments = () => {
  const [isOpen, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [employees, setEmployees] = useState([]);

  const handleOpen = (editData) => {
    setEditData(editData);
    setEdit(!!editData); // Set isEdit to true if editData is provided
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Dummy department data
  const [departments, setDepartments] = useState([]);
  const getDepartments = () => {
    DepartmentService.getDepartments().then((res) => {
      setDepartments(res.data.data);
      setEmployees(res.data.data.employees);
    });
  };
  useEffect(() => {
    getDepartments();
  }, []);

  const handleDelete = async (departmentId) => {
    const res = await DepartmentService.deleteDepartment(departmentId);
    const departments = await DepartmentService.getDepartments();
    setDepartments(departments.data.data);

    toast.success(res.data.message);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  const viewEmployees = (employees) => {
    setEmployees(employees);
    setShow(true);
  };

  return (
    <>
      {show ? (
        <EmployeeList
          department={true}
          setEmployees={setEmployees}
          employees={employees}
          getDepartments={getDepartments}
          name={`Employees in Department`}
        />
      ) : (
        <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Departments
          </h2>
          <button
            onClick={() => handleOpen()}
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
                  <th className="py-2 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments?.length > 0 ? (
                  departments?.map((department, i) => (
                    <tr
                      key={department._id}
                      className={i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                    >
                      <td className="py-2 px-4 border-b">{i + 1}</td>
                      <td className="py-2 px-4 border-b">{department?.name}</td>

                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={() => viewEmployees(department?.employees)}
                          className="text-green-500 hover:underline mx-2"
                        >
                          View Employees
                        </button>
                        <button
                          onClick={() => handleOpen(department)}
                          className="text-blue-500 hover:underline mx-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(department._id)}
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
          <DepartmentModal
            isOpen={isOpen}
            handleClose={handleClose}
            setDepartments={setDepartments}
            isEdit={isEdit}
            editData={isEdit ? editData : null} // Pass null for adding a new department
          />
        </div>
      )}
    </>
  );
};

export default Departments;
