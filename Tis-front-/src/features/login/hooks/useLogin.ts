import { useState } from 'react';
import type { FormEvent } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { loginService } from '../services/login.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/context/AuthContext';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const user = await loginService.login(email, password);

      login(user);

      showToast(`¡Bienvenido de nuevo, ${user.fullName}!`, 'success');

      console.log('User logged in:', user);

      const esAdministrador = user.roles?.includes('ROLE_ADMIN');

      setTimeout(() => {
        if (esAdministrador) {
          navigate('/admin/reportes/usuarios');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al iniciar sesión';

      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
  };
};