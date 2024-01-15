// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css"; // Create this file to style your app
import Departments from "./components/DepartmentsTab";
import EmployeeListTab from "./components/EmployeeListTab";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login2";
import { Toaster } from "react-hot-toast";
import AuthService from "./services/AuthService";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getProfile()
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* Conditionally render login and register pages if userData is not available */}
      {userData ? (
        <div className="flex">
          <div>{userData && <Sidebar user={userData} />}</div>
          <Routes className="content">
            <Route path="/" exact element={<Home user={userData} />} />
            {userData.ismanager && (
              <Route path="employees" element={<EmployeeListTab />} />
            )}
            {userData.ismanager && (
              <Route path="departments" element={<Departments />} />
            )}
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      )}
      <Toaster />
    </Router>
  );
};

export default App;
