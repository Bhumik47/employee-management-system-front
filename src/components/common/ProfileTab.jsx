// Profile.js

import React from "react";

const Profile = ({ name, user }) => {

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96">
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full h-52 w-52 object-cover mx-auto mb-4"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {user?.name}
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              <span className="font-bold">Salary:</span> ${user?.salary}
            </li>
            <li className="mb-2">
              <span className="font-bold">Address:</span> {user?.address}
            </li>
            <li className="mb-2">
              <span className="font-bold">Department:</span>{" "}
              {user?.department}
            </li>
            <li className="mb-2">
              <span className="font-bold">Joining Date:</span>{" "}
              {user?.date}
            </li>
          </ul>
          <div className="mt-6 flex items-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
