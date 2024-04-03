import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default ManagerLayout;
