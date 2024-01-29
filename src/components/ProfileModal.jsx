import React, { useEffect } from "react";

const ProfileModal = ({
  name,
  open,
  handleProfileClose,
  employeeData,
  handleOpen,
  department,
}) => {
  console.log(employeeData);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"; // Prevent scrolling when the modal is open
    return () => {
      document.body.style.overflow = "auto"; // Restore scrolling when the component is unmounted
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 overflow-y-auto ${open ? "" : "hidden"}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => {
            handleProfileClose();
          }}
        >
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full`}
        >
          <div className={`container mx-auto mt-8 p-8 ${open ? "" : "hidden"}`}>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-full h-52 w-52 object-cover mx-auto mb-4 border-4 border-gray-400"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {employeeData?.name}
                </h2>
                <ul className="list-disc list-inside text-gray-600">
                  <li className="mb-2">
                    <span className="font-bold">Salary:</span> $
                    {employeeData?.salary}
                  </li>
                  <li className="mb-2">
                    <span className="font-bold">Address:</span>{" "}
                    {employeeData?.address}
                  </li>
                  <li className="mb-2">
                    <span className="font-bold">Department:</span>{" "}
                    {employeeData?.department?.name}
                  </li>
                  <li className="mb-2">
                    <span className="font-bold">Joining Date:</span>{" "}
                    {employeeData?.createdAt}
                  </li>
                </ul>
                <div className="mt-6 flex items-center">
                 {!department && <button
                    onClick={() => handleOpen(employeeData)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Edit Profile
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
