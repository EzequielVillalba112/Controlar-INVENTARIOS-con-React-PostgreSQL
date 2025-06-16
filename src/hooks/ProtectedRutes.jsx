import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

export const ProtectedRutes = ({  user, redirectTo, children }) => {
  if (user == null) return <Navigate replace to={redirectTo} />;
  return children ? children : <Outlet />;
};
