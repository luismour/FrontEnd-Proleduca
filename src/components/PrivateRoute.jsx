import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ redirectTo = "/login", roles = [] }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    // Não autenticado
    return <Navigate to={redirectTo} />;
  }

  // Se quiser checar papel (roles), adicione aqui
  if (roles.length > 0) {
    const userRoles = user?.roles || [];
    const hasRole = roles.some(role => userRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/" />; // ou página de acesso negado
    }
  }

  return <Outlet />;
}
