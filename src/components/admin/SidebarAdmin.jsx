
import { NavLink } from "react-router-dom";


const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-white transition-colors">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const InstitutionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-white transition-colors">
    {/*  */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V5.63M21 12v-2.25"/>
  </svg>
);

const CoursesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-white transition-colors">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-white transition-colors">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const ScholarshipHoldersIcon = () => ( 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-white transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
);

const InscriptionsIcon = () => ( 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3 group-hover:text-white transition-colors">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V11.25A1.125 1.125 0 014.875 10.125H7.5M15.75 17.25H21m-8.25-3H18c.621 0 1.125-.504 1.125-1.125V6.375A1.125 1.125 0 0018.75 5.25h-9.75A1.125 1.125 0 007.875 6.375v3.375c0 .621.504 1.125 1.125 1.125h2.625m0-3.375V6.375" />
    </svg>
);

const NavItem = ({ to, icon, children }) => {
  const baseClasses = "group flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out";
  const activeClasses = "bg-blue-700 text-white shadow-inner"; 
  const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <NavLink
      to={to}
      end 
      className={({ isActive }) => 
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon}
      <span className="truncate">{children}</span>
    </NavLink>
  );
};

export default function SidebarAdmin() {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white flex flex-col fixed top-0 left-0 z-40 shadow-lg">
      {/*  */}
      <div className="px-4 h-16 flex items-center border-b border-slate-700"> {/*  */}
        {/* */}
        {/*  */}
        <h2 className="text-lg font-semibold text-white truncate">Painel Administrativo</h2>
      </div>

      {/* Navegação com rolagem interna */}
      <nav className="flex-grow px-3 py-4 space-y-1.5 overflow-y-auto"> {/*  */}
        <NavItem to="/admin/dashboard" icon={<DashboardIcon />}>Dashboard</NavItem>
        <NavItem to="/admin/institutions" icon={<InstitutionsIcon />}>Instituições</NavItem>
        <NavItem to="/admin/courses" icon={<CoursesIcon />}>Cursos</NavItem>
        <NavItem to="/admin/users" icon={<UsersIcon />}>Usuários</NavItem>
        <NavItem to="/admin/scholarship-holders" icon={<ScholarshipHoldersIcon />}>Bolsistas</NavItem>
        {/*  */}
        <NavItem to="/admin/inscriptions" icon={<InscriptionsIcon />}>Inscrições</NavItem>
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="px-4 py-3 border-t border-slate-700 mt-auto">
        <p className="text-xs text-slate-400 text-center">© {new Date().getFullYear()} Edupass</p>
      </div>
    </aside>
  );
}