// Profile.js

import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import UserProfileModal from "../modals/UserProfileModal";
import toast from "react-hot-toast";

const Profile = ({ name }) => {
  const [userProfile, setUserProfile] = useState();
  const [editData, setEditData] = useState({});
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    AuthService.getProfile().then((res) => {
      setUserProfile(res.data.user);
      setEditData(res.data.user);
    });
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long", // Specify "long" for the full month name
      day: "numeric",
    };

    return dateObject.toLocaleDateString("en-US", options);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEdit = async () => {
    // Email validation check
    if (!validateEmail(editData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await AuthService.editEmployee(editData);
      if (response.status === 201) {
        AuthService.getProfile().then((res) => {
          setUserProfile(res.data.user);
          setEditData(res.data.user);
        });
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

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{name}</h2>

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
            {userProfile?.name}
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              <span className="font-bold">Email:</span> {userProfile?.email}
            </li>
            <li className="mb-2">
              <span className="font-bold">Salary:</span> ${userProfile?.salary}
            </li>
            <li className="mb-2">
              <span className="font-bold">Address:</span> {userProfile?.address}
            </li>
            {!userProfile?.ismanager && (
              <li className="mb-2">
                <span className="font-bold">Department:</span>{" "}
                {userProfile?.department?.name}
              </li>
            )}
            <li className="mb-2">
              <span className="font-bold">Joining Date:</span>{" "}
              {formatDate(userProfile?.createdAt)}
            </li>
          </ul>
          {userProfile?.ismanager && (
            <div className="mt-6 flex items-center">
              <button
                onClick={handleOpen}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
      <UserProfileModal
        isOpen={isOpen}
        handleClose={handleClose}
        handleEdit={handleEdit}
        userData={editData}
        setUserData={setEditData}
      />
    </div>
  );
};

export default Profile;
