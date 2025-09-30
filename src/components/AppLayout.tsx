import { Outlet } from "react-router-dom";
import LogoHeader from "./LogoHeader";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#003A70] text-[#e6f0fa]">
      <LogoHeader />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
