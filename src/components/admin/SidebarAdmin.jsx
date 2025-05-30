import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Painel Administrativo</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/admin/institutions" className="hover:text-yellow-400">Instituições</Link>
        <Link to="/admin/courses" className="hover:text-yellow-400">Cursos</Link>
        <Link to="/admin/users" className="hover:text-yellow-400">Usuários</Link>
      </nav>
    </aside>
  );
}
