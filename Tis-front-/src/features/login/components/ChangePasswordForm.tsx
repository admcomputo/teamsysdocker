import { useState, type FormEvent } from 'react';
import { useChangePassword } from '../hooks/useChangePassword';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useToast } from '@shared/hooks/useToast';

export const ChangePasswordForm = () => {
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNuevo, setPasswordNuevo] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { changePassword, isLoading } = useChangePassword();
  const { showToast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (!passwordActual.trim() || !passwordNuevo.trim() || !confirmPassword.trim()) {
      showToast('Todos los campos son requeridos', 'error');
      return;
    }

    if (passwordNuevo !== confirmPassword) {
      showToast('Las contraseñas nuevas no coinciden', 'error');
      return;
    }

    if (passwordNuevo.length < 8) {
      showToast('La contraseña debe tener al menos 8 caracteres', 'error');
      return;
    }

    if (passwordActual === passwordNuevo) {
      showToast('La nueva contraseña debe ser diferente a la actual', 'error');
      return;
    }

    const result = await changePassword(passwordActual, passwordNuevo);

    if (result.success) {
      setPasswordActual('');
      setPasswordNuevo('');
      setConfirmPassword('');
    }
  };

  const isPasswordsMatching = passwordNuevo === confirmPassword && passwordNuevo.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <Input
          label="Contraseña Actual"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="current-password"
          value={passwordActual}
          onChange={(e) => setPasswordActual(e.target.value)}
          required
          className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
        />

        <Input
          label="Nueva Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="new-password"
          value={passwordNuevo}
          onChange={(e) => setPasswordNuevo(e.target.value)}
          required
          className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
        />

        <Input
          label="Confirmar Nueva Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`bg-white/5 border-white/10 focus:border-brand-accent-neon/50 transition-all ${
            confirmPassword.length > 0 && !isPasswordsMatching
              ? 'border-red-500/50 focus:border-red-500'
              : ''
          }`}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="show-password" className="text-sm text-text-muted cursor-pointer">
            Mostrar contraseñas
          </label>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !passwordActual.trim() || !isPasswordsMatching}
        isLoading={isLoading}
        className="w-full mt-8"
      >
        {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
      </Button>
    </form>
  );
};
