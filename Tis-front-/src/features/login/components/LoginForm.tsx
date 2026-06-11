import { Link } from 'react-router-dom';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const { email, setEmail, password, setPassword, isLoading, handleLogin } = useLogin();

  return (
    <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
          ¡Bienvenido de nuevo!
        </h2>
        <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
          Ingresa a tu portafolio digital
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-5">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="nombre@ejemplo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
            />
            <div className="space-y-1">
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
              />
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-text-muted hover:text-brand-accent-neon transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          isLoading={isLoading} 
          disabled={isLoading}
          className="w-full h-14 text-lg font-bold tracking-wide mt-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t border-white/5 text-center">
        <p className="text-text-muted">
          ¿No tienes una cuenta?{' '}
          <Link 
            to="/register" 
            className="text-brand-accent-neon hover:text-brand-azul-neon font-semibold transition-all hover:underline underline-offset-4"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
