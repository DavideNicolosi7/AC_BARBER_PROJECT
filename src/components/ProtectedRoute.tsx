import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
