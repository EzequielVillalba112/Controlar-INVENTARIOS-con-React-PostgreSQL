import { Routes, Route } from "react-router-dom";
import { Home } from "../page/Home";
import { Login } from "../page/Login";
import { ProtectedRutes } from "../hooks/ProtectedRutes";
import { userAuth } from "../context/AuthContext";

export const MyRoutes = () => {
  const { user } = userAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRutes user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};
