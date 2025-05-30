// src/components/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute({ redirectTo = "/login", roles = [] }) {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const location = useLocation();

  if (!token || !user) {
    // Não autenticado ou dados do usuário não encontrados
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verifica as roles se a prop 'roles' for fornecida e tiver itens
  if (roles.length > 0) {
    const userRoles = user.roles || []; // Pega as roles do objeto user
    // Verifica se o usuário possui ALGUMA das roles requeridas
    const hasRequiredRole = roles.some(requiredRole => userRoles.includes(requiredRole));
    
    if (!hasRequiredRole) {
   
      alert("Você não tem permissão para acessar esta página."); // Alerta simples, pode ser melhorado
      return <Navigate to="/" state={{ from: location }} replace />; 
    }
  }

  return <Outlet />; // Usuário autenticado e (se roles foram especificadas) autorizado
}