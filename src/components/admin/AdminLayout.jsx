// src/components/admin/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

export default function AdminLayout() {
  return (
    // A classe 'dark' no elemento <html> (aplicada pelo ThemeContext)
    // fará com que as classes dark: deste componente e de seus filhos funcionem.
    <div className="relative flex min-h-screen bg-gray-100 dark:bg-slate-900">
      <SidebarAdmin />
      <main className="flex-1 ml-64 transition-colors duration-300">
        {/* A cor de fundo da <main> pode ser a mesma do wrapper ou omitida para herdar */}
        {/* Se quiser um fundo diferente para <main> no modo escuro, adicione dark:bg-outro-tom-escuro aqui */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}