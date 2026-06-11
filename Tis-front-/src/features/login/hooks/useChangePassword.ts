import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePasswordService } from '../services/changePassword.service';
import { useToast } from '@shared/hooks/useToast';

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const changePassword = async (passwordActual: string, passwordNuevo: string) => {
    setIsLoading(true);

    try {
      const result = await changePasswordService.changePassword(passwordActual, passwordNuevo);

      if (result.success) {
        showToast('Contraseña cambiada exitosamente', 'success');
        
        // Redirigir al dashboard después de un breve delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        
        return { success: true };
      } else {
        const errorMessage = result.message || 'Error al cambiar la contraseña';
        showToast(errorMessage, 'error');
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cambiar la contraseña';
      showToast(errorMessage, 'error');
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};
