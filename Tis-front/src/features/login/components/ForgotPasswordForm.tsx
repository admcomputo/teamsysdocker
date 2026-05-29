import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useToast } from '@shared/hooks/useToast';
import { loginService } from '../services/login.service';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); //Estado para error local
  const { showToast } = useToast();

  // Regex para validación de correo profesional
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('El correo electrónico es obligatorio');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await loginService.sendPasswordResetEmail(email);
      
      if (result.success || result.message) {
        showToast(result.message ||'Se ha enviado un correo de verificación. Revisa tu bandeja de entrada.', 'success');
        setEmail('');
      } else {
        showToast(result.message || 'Error al enviar el correo de recuperación', 'error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el correo de recuperación';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <Input
          label="Ingresa tu correo"
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null); // Limpiar error mientras escribe
          }}
          required
          className={`bg-white/5 border-white/10 ${
            error ? 'border-red-500 focus:border-red-500' : 'focus:border-brand-accent-neon/50'
          }`}
        />
        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        disabled={!email.trim() || isLoading}
        className="w-full h-14 text-lg font-bold tracking-wide mt-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Verificar
      </Button>

      <div className="text-sm text-text-muted text-center">
        <p>¿Ya recuerdas tu contraseña?</p>
        <Link
          to="/login"
          className="text-brand-accent-neon hover:text-brand-azul-neon font-semibold transition-all hover:underline underline-offset-4"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </form>
  );
};
