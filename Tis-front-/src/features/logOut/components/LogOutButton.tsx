import React from 'react';
import { useLogOut } from '../hooks/useLogOut';

export const LogOutButton: React.FC = () => {
  const { handleLogOut, isPending } = useLogOut();

  return (
    <button
      onClick={handleLogOut}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
    >
      {isPending ? 'Cerrando sesión...' : 'Cerrar Sesión'}
    </button>
  );
};
