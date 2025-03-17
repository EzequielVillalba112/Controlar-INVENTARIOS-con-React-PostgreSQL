import { Routes, Route } from "react-router-dom";
import { Home } from "../page/Home";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
