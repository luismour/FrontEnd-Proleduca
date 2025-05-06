// src/hooks/useAuth.js
import { useEffect, useState } from "react";

export function useAuth() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(false);
    window.location.href = "/"; 
  };

  return { userLoggedIn, logout };
}
