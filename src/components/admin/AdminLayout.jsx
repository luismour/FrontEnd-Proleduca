import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="flex-1 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
