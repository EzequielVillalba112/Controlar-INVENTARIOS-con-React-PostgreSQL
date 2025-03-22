import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRutes = ({ user, redirectTo, children }) => {
  if (user == null) return <Navigate replace to={redirectTo} />;
  return children ? children : <Outlet />;
};
