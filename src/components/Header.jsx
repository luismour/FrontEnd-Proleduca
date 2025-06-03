
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-600 group-hover:text-blue-600">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);


const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600 transition-colors">
    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12.5a7.5 7.5 0 0 0-7.465 5.266.75.75 0 0 0 .959.806 6 6 0 0 1 13.012 0 .75.75 0 0 0 .96-.806A7.5 7.5 0 0 0 10 12.5Z" clipRule="evenodd" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600 transition-colors">
    <path d="M3.5 2.75A.75.75 0 0 0 2.75 3.5v13.5A.75.75 0 0 0 3.5 18h13a.75.75 0 0 0 .75-.75V7.355A2.25 2.25 0 0 0 15.06 5.5H9.25a2.25 2.25 0 0 1-2.121-1.608L6.73 3.023A.75.75 0 0 0 6.09 2.5H4.25A.75.75 0 0 0 3.5 2.75Z" />
    <path d="M7.25 4h5.5A.75.75 0 0013.5 3.25v-1.5A.75.75 0 0012.75 1h-5.5A.75.75 0 006.5 1.75v1.5A.75.75 0 007.25 4z" /> {/* Adicionada a alça da maleta */}
  </svg>
);
const UsersGroupIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-600 transition-colors">
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.25 1.25 0 0 0 .41 1.415A8.969 8.969 0 0 0 10 18c1.994 0 3.868-.594 5.124-1.592a1.25 1.25 0 0 0 .41-1.415A8.969 8.969 0 0 0 10 12c-1.994 0-3.868.594-5.124-1.592a1.25 1.25 0 0 0-.411 1.415ZM15.93 14.01A7.475 7.475 0 0 1 10 13.5c-1.345 0-2.61.336-3.703.937a.75.75 0 0 0-1.03-.037L3.067 16.15a.75.75 0 0 0 1.03.037 5.974 5.974 0 0 1 1.885-1.113.75.75 0 0 0 .446-1.313A9.004 9.004 0 0 0 10 5c.939 0 1.826.17 2.642.486a.75.75 0 0 0 .446 1.313 5.975 5.975 0 0 1 1.885 1.113.75.75 0 0 0 1.03-.037l2.2-1.739a.75.75 0 0 0-1.03-.038A7.475 7.475 0 0 1 15.93 14.01Z" />
  </svg>
);
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-slate-500 group-hover:text-red-500 transition-colors"> {/* Hover vermelho para logout */}
    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943H18.25A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
  </svg>
);


export default function Header({ userLoggedIn, setUserLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Para menu hambúrguer
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = userLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login"); 
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <h2 className="text-3xl font-extrabold">
                <span className="text-blue-600">Edu</span>
                <span className="text-yellow-400">pass</span>
              </h2>
            </Link>
          </div>

     
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/parceria-instituicoes" 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Parceria Instituições
            </Link>
            {userLoggedIn && user?.roles?.includes("ROLE_ADMIN") && (
                 <Link 
                    to="/admin/dashboard" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                    Painel Admin
                </Link>
            )}

            {userLoggedIn ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  aria-label="Menu do usuário"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <UserIcon />
                </button>

                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-1 origin-top-right transition-all duration-150 ease-out transform opacity-100 scale-100" // Animação suave
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {user && (
                        <div className="px-4 py-3 border-b border-slate-100">
                            <p className="text-sm font-medium text-slate-800 truncate">{user.fullName || user.email || "Usuário"}</p>
                            {user.email && user.fullName && <p className="text-xs text-slate-500 truncate">{user.email}</p>}
                        </div>
                    )}
                    <div className="py-1">
                        <Link to="/perfil" onClick={() => setIsDropdownOpen(false)} className="group flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600 w-full transition-colors" role="menuitem">
                            <ProfileIcon /> Perfil
                        </Link>
                        <Link to="/minhas-bolsas" onClick={() => setIsDropdownOpen(false)} className="group flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-600 w-full transition-colors" role="menuitem">
                            <BriefcaseIcon /> Minhas Bolsas
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 py-1">
                        <button onClick={handleLogout} className="group flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 w-full transition-colors" role="menuitem">
                            <LogoutIcon /> Sair
                        </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2 rounded-md transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="btn btn-primary px-5 py-2 text-sm" 
                >
                  Cadastre-se Grátis
                </Link>
              </div>
            )}
          </nav>

          {/* Botão do Menu Hambúrguer (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-40 p-2 transition transform origin-top" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/parceria-instituicoes" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">Parceria Instituições</Link>
            {userLoggedIn && user?.roles?.includes("ROLE_ADMIN") && (
                 <Link to="/admin/dashboard" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Painel Admin</Link>
            )}
          </div>
          {userLoggedIn ? (
            <div className="pt-4 pb-3 border-t border-slate-200">
              {user && (
                <div className="flex items-center px-4 mb-3">
                    <div className="flex-shrink-0 mr-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600">
                            <UserIcon/>
                        </div>
                    </div>
                    <div>
                        <div className="text-base font-medium text-slate-800">{user.fullName || user.email || "Usuário"}</div>
                        {user.email && user.fullName && <div className="text-sm font-medium text-slate-500">{user.email}</div>}
                    </div>
                </div>
              )}
              <div className="space-y-1">
                <Link to="/perfil" onClick={closeMobileMenu} className="group flex items-center px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md"><ProfileIcon /> Perfil</Link>
                <Link to="/minhas-bolsas" onClick={closeMobileMenu} className="group flex items-center px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md"><BriefcaseIcon /> Minhas Bolsas</Link>
                <Link to="/dependentes" onClick={closeMobileMenu} className="group flex items-center px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md"><UsersGroupIcon /> Dependentes</Link>
                <button onClick={handleLogout} className="group flex items-center px-4 py-2.5 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 w-full rounded-md"><LogoutIcon /> Sair</button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-slate-200 space-y-3">
              <Link to="/login" onClick={closeMobileMenu} className="block w-full text-center px-4 py-2.5 text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md">Entrar</Link>
              <Link to="/cadastro" onClick={closeMobileMenu} className="block w-full text-center btn btn-primary px-4 py-2.5 text-base">Cadastre-se Grátis</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}