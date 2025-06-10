import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

export const ProtectedRutes = ({  accessBy, children }) => {
  const { user } = userAuth();
  if (accessBy === "non-authenticated") {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else if (accessBy === "authenticated") {
    if (user) return children;
  }

  return <Navigate to="/login"/>
};
