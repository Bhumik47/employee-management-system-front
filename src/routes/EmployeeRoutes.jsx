import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EmployeeLayout from "../layouts/EmployeeLayout";
import Home from "../components/Home";
import { ProtectedEmployee } from "../components/Protected/Protected";

const EmployeeRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/employee"
          element={
            <ProtectedEmployee route={"/manager"}>
              <EmployeeLayout />
            </ProtectedEmployee>
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default EmployeeRoutes;
