import { Routes, Route } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* thêm page khác ở đây */}
        {/* <Route path="/about" element={<About />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
