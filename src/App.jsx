// src/App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css"; // Create this file to style your app
import Departments from "./components/DepartmentsTab";
import EmployeeListTab from "./components/EmployeeListTab";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login2";
import { Toaster } from "react-hot-toast";
import AuthService from "./services/AuthService";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import ManagerRoutes from "./routes/ManagerRoutes";
import { ProtectedAuth } from "./components/Protected/Protected";

const App = () => {
  return (
    <>
      <div className="flex">
        <Routes>
          <Route
            path="register"
            element={
              <ProtectedAuth>
                <Register />
              </ProtectedAuth>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedAuth>
                <Login />
              </ProtectedAuth>
            }
          />
        </Routes>
        <EmployeeRoutes />
        <ManagerRoutes />
      </div>
      <Toaster />
    </>
  );
};

export default App;
