import React from 'react';
import { LogOutButton } from '../components/LogOutButton';

export const LogOutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Cerrar Sesión</h1>
        <p className="text-gray-600 mb-8">¿Estás seguro que deseas salir de tu cuenta?</p>
        <LogOutButton />
      </div>
    </div>
  );
};
