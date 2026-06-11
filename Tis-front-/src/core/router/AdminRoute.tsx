import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { User } from '@/features/login/models/user.model';

const obtenerUsuarioStorage = (): User | null => {
  const storedUser = sessionStorage.getItem('user');

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

export const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  const usuarioActual = user ?? obtenerUsuarioStorage();

  const esAdministrador = usuarioActual?.roles?.includes('ROLE_ADMIN');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!esAdministrador) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};