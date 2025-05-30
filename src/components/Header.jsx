// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Componentes SVG para os ícones (você pode movê-los para arquivos separados se preferir)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600">
    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12.5a7.5 7.5 0 0 0-7.465 5.266.75.75 0 0 0 .959.806 6 6 0 0 1 13.012 0 .75.75 0 0 0 .96-.806A7.5 7.5 0 0 0 10 12.5Z" clipRule="evenodd" />
  </svg>
);

const BriefcaseIcon = () => ( // Ícone para "Minhas Bolsas"
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600">
    <path d="M3.5 2.75A.75.75 0 0 0 2.75 3.5v13.5A.75.75 0 0 0 3.5 18h13a.75.75 0 0 0 .75-.75V7.355A2.25 2.25 0 0 0 15.06 5.5H9.25a2.25 2.25 0 0 1-2.121-1.608L6.73 3.023A.75.75 0 0 0 6.09 2.5H4.25A.75.75 0 0 0 3.5 2.75Z" />
  </svg>
);

const UsersIcon = () => ( // Ícone para "Dependentes"
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-600">
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.25 1.25 0 0 0 .41 1.415A8.969 8.969 0 0 0 10 18c1.994 0 3.868-.594 5.124-1.592a1.25 1.25 0 0 0 .41-1.415A8.969 8.969 0 0 0 10 12c-1.994 0-3.868.594-5.124 1.592a1.25 1.25 0 0 0-.411 1.415ZM15.93 14.01A7.475 7.475 0 0 1 10 13.5c-1.345 0-2.61.336-3.703.937a.75.75 0 0 0-1.03-.037L3.067 16.15a.75.75 0 0 0 1.03.037 5.974 5.974 0 0 1 1.885-1.113.75.75 0 0 0 .446-1.313A9.004 9.004 0 0 0 10 5c.939 0 1.826.17 2.642.486a.75.75 0 0 0 .446 1.313 5.975 5.975 0 0 1 1.885 1.113.75.75 0 0 0 1.03-.037l2.2-1.739a.75.75 0 0 0-1.03-.038A7.475 7.475 0 0 1 15.93 14.01Z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-600">
    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943H18.25A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
  </svg>
);


export default function Header({ userLoggedIn, setUserLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
    localStorage.removeItem("token"); // Importante: remover o token também
    localStorage.removeItem("user");  // E o objeto user
    setUserLoggedIn(false);
    setIsDropdownOpen(false); // Fechar dropdown ao sair
    navigate("/login"); 
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          {/* Você pode adicionar um SVG ou img para o logo aqui se desejar */}
          <h2 className="text-3xl font-bold ml-4 md:ml-20 leading-tight">
            <span className="font-extrabold text-blue-600">Edu</span>
            <span className="text-yellow-400">pass</span>
          </h2>
        </Link>
      </div>

      <div className="relative flex items-center gap-4 mr-4 md:mr-20">
        {!userLoggedIn && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-150 text-sm font-medium">
            Parceria Instituições
          </button>
        )}

        {userLoggedIn ? (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-150"
              aria-label="Menu do usuário"
              aria-expanded={isDropdownOpen}
            >
              <UserIcon />
            </button>

            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-xl z-20 overflow-hidden ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="py-1">
                  {/* Opcional: Informações do usuário no topo do dropdown */}
                  {/* <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {JSON.parse(localStorage.getItem("user"))?.email || "Usuário"}
                    </p>
                  </div>
                  */}
                  <Link
                    to="/perfil"
                    onClick={() => setIsDropdownOpen(false)}
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 w-full transition-colors duration-150"
                    role="menuitem"
                  >
                    <ProfileIcon />
                    Perfil
                  </Link>
                  <Link
                    to="/minhas-bolsas"
                    onClick={() => setIsDropdownOpen(false)}
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 w-full transition-colors duration-150"
                    role="menuitem"
                  >
                    <BriefcaseIcon />
                    Minhas Bolsas
                  </Link>
                  <Link
                    to="/dependentes" // Ajuste o link se necessário
                    onClick={() => setIsDropdownOpen(false)}
                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 w-full transition-colors duration-150"
                    role="menuitem"
                  >
                    <UsersIcon />
                    Dependentes
                  </Link>
                </div>
                <div className="border-t border-gray-200 py-1">
                  <button
                    onClick={handleLogout}
                    className="group flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 w-full transition-colors duration-150"
                    role="menuitem"
                  >
                    <LogoutIcon />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-150 text-sm font-medium">
              Entrar
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}