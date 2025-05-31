import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="relative flex min-h-screen"> {/* Adicionado relative e min-h-screen no wrapper se necessário */}
      <SidebarAdmin />
      {/* Conteúdo principal com margem à esquerda para compensar a sidebar fixa */}
      <main className="flex-1 bg-gray-100 min-h-screen ml-64"> {/* <--- ADICIONADO ml-64 */}
        <div className="p-4 md:p-6 lg:p-8"> {/* Adicionado um padding interno ao main */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}