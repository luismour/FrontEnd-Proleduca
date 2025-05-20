import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, School, BookOpenCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Clientes", icon: Users, path: "/admin/clients" },
  { name: "Instituições", icon: School, path: "/admin/institutions" },
  { name: "Cursos", icon: BookOpenCheck, path: "/admin/courses" },
  { name: "Administradores", icon: ShieldCheck, path: "/admin/users" },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">EduPass Admin</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md transition hover:bg-blue-100 ${
                location.pathname.startsWith(item.path) ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <h2 className="text-lg font-semibold">Área Administrativa</h2>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Sair</Button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
