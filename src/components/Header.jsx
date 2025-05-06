import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    setUserLoggedIn(false);
    navigate("/login"); // redireciona para página de login
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold ml-20 leading-tight">
          <Link to="/">
            <span className="font-extrabold text-blue-600">Edu</span>
            <span className="text-yellow-400">pass</span>
          </Link>
          </h2>
        </div>
      </div>

      <div className="relative flex items-center gap-4">
        {!userLoggedIn && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Parceria Instituições
          </button>
        )}

        {userLoggedIn ? (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-white font-bold"
            >
              👤
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </Link>
                <Link
                  to="/minhas-bolsas"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Minhas Bolsas
                </Link>
                <Link
                  to="/dependentes"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dependentes
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
            Entrar
          </button>
          </Link>
        )}
      </div>
    </header>
  );
}
