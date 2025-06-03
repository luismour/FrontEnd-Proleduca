import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="relative flex min-h-screen"> {/**/}
      <SidebarAdmin />
      {/*  */}
      <main className="flex-1 bg-gray-100 min-h-screen ml-64"> {/*  */}
        <div className="p-4 md:p-6 lg:p-8"> {/*  */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}