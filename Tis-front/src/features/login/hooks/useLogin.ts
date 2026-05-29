import { useState } from 'react';
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
  
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isLoading) return; // 🚨 evita múltiples requests

  setIsLoading(true);

    try {
      const user = await loginService.login(email, password);
      showToast(`¡Bienvenido de nuevo, ${user.fullName}!`, 'success');
      
      // Update global context
      login(user);

      console.log('User logged in:', user);
      setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
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
    handleLogin
  };
};
