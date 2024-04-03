import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedManager = ({ route, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to={"/"} />;
  }
  if (!user?.ismanager) {
    return <Navigate to={route} />;
  }

  return children;
};

export const ProtectedEmployee = ({ route, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to={"/"} />;
  }

  if (user?.ismanager) {
    return <Navigate to={route} />;
  }

  return children;
};

export const ProtectedAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to={user?.ismanager ? "/manager" : "/employee"} />;
  }

  return children;
};
