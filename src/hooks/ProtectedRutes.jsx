import { Navigate, Outlet } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

export const ProtectedRutes = ({ redirectTo = "/login", children }) => {
  const { user, loading } = userAuth();

  if (loading) return <div>Cargando sesión...</div>;

  return user ? (children ? children : <Outlet />) : <Navigate to={redirectTo} replace />;
};