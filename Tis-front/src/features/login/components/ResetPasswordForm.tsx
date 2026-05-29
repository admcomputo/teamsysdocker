import { useState, type FormEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useToast } from '@shared/hooks/useToast';
import { loginService } from '../services/login.service';

export const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (!newPassword.trim() || !confirmPassword.trim()) return;

    if (newPassword !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    if (newPassword.length < 8) {
      showToast('La contraseña debe tener al menos 8 caracteres', 'error');
      return;
    }

    if (!token) {
      showToast('Token de recuperación inválido o expirado', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginService.resetPassword(token, newPassword);
      
      if (result.success) {
        setNewPassword('');
        setConfirmPassword('');
        showToast('Contraseña cambiada exitosamente', 'success');
        
        // Redirigir a login después de un breve delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showToast(result.message || 'Error al restablecer la contraseña', 'error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al restablecer la contraseña';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordsMatching = newPassword === confirmPassword && newPassword.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <Input
          label="Nueva Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
        />
        <Input
          label="Confirmar Contraseña"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`bg-white/5 border-white/10 focus:border-brand-accent-neon/50 ${
            confirmPassword && !isPasswordsMatching ? 'border-red-500/50' : ''
          }`}
        />
        {confirmPassword && !isPasswordsMatching && (
          <p className="text-sm text-red-400">Las contraseñas no coinciden</p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!newPassword.trim() || !isPasswordsMatching || !token || isLoading}
        className="w-full h-14 text-lg font-bold tracking-wide mt-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Restablecer Contraseña
      </Button>
    </form>
  );
};
