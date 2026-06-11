import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../utils/validation';
import type { RegisterFormData } from '../utils/validation';
import { registerService } from '../services/register.service';
import { registerAdapter } from '../services/register.adapter';
import { useToast } from '@shared/hooks/useToast';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      profession: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched'
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const dto = registerAdapter(data);
      
      const response = await registerService.register(dto);

      if (response.success) {
        showToast(response.message, 'success');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setServerError(response.message);
        showToast(response.message, 'error');
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Ocurrió un error inesperado. Por favor intenta de nuevo.';
      setServerError(msg);
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
