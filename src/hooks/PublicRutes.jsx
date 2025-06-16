import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import { Login } from "../page/Login";

export const PublicRoute = () => {
  const { user, loading } = userAuth();

  if (loading) return <div>Cargando sesión...</div>;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Login/>;
};
