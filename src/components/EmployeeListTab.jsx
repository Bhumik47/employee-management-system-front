// EmployeesList.js

import React, { useEffect, useState } from "react";
import EmployeeList from "./common/EmployeeList";
import AuthService from "../services/AuthService";

const EmployeeListTab = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
     AuthService.getAllUsers().then((res) => {
       setUsers(res.data.data);
     });
  }
  useEffect(() => {
    getAllUsers();
  },[])
  return (
    <EmployeeList
      employees={users}
      getAllUsers={getAllUsers}
      name={"All Employees"}
    />
  );
};

export default EmployeeListTab;
