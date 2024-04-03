import React from "react";
import { Route, Routes } from "react-router-dom";
import ManagerLayout from "../layouts/ManagerLayout";
import Home from "../components/Home";
import EmployeeListTab from "../components/EmployeeListTab";
import Departments from "../components/DepartmentsTab";
import { ProtectedManager } from "../components/Protected/Protected";

const ManagerRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/manager"
          element={
            <ProtectedManager route={"/employee"}>
              {" "}
              <ManagerLayout />{" "}
            </ProtectedManager>
          }
        >
          <Route index element={<Home />} />
          <Route path="employees" element={<EmployeeListTab />} />
          <Route path="departments" element={<Departments />} />
        </Route>
      </Routes>
    </>
  );
};

export default ManagerRoutes;
