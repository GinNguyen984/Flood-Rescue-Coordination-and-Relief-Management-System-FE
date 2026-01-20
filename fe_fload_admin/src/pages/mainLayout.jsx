import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./mainLayout.css";

export default function MainLayout() {
  return (
    <div className="main-layout">
      {/* FIXED HEADER */}
      <Header />

      <div className="main-body">
        {/* FIXED SIDEBAR */}
        <Sidebar />

        {/* SCROLL CONTENT */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
