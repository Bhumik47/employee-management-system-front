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
  const [userData, setUserData] = useState();

  useEffect(() => {
    AuthService.getProfile().then((res) => {
      setUserData(res.data.user)
    })
  },[])
  
  return (
    <Router>
      <div className="flex">
        <div>{userData && <Sidebar user={userData} />}</div>
        <Routes className="content">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="/" exact element={<Home user={userData} />} />
          {userData?.ismanager && (
            <Route path="employees" element={<EmployeeListTab />} />
          )}
          {userData?.ismanager && (
            <Route path="departments" element={<Departments />} />
          )}
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
