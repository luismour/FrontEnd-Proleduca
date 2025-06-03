// src/components/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute({ redirectTo = "/login", roles = [] }) {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const location = useLocation();

  if (!token || !user) {
   
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (roles.length > 0) {
    const userRoles = user.roles || []; 
 
    const hasRequiredRole = roles.some(requiredRole => userRoles.includes(requiredRole));
    
    if (!hasRequiredRole) {
   
      alert("Você não tem permissão para acessar esta página."); 
      return <Navigate to="/" state={{ from: location }} replace />; 
    }
  }

  return <Outlet />; 
}