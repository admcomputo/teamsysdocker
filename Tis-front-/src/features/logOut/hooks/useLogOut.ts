import { useState } from 'react';
import { logOutService } from '../services/logOut.service';

export const useLogOut = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogOut = async () => {
    setIsPending(true);
    setError(null);
    try {
      await logOutService();
      // TODO: Redirigir al usuario o limpiar el estado global de auth
      // ej: navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Error al intentar cerrar sesión');
    } finally {
      setIsPending(false);
    }
  };

  return { handleLogOut, isPending, error };
};
