import { useRegister } from '../hooks/useRegister';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
  const { form, isLoading, serverError, onSubmit } = useRegister();
  const { register, formState: { errors } } = form;

  return (
    <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
          Crear cuenta
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {serverError && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium animate-shake">
            {serverError}
          </div>
        )}

        <div className="space-y-5">
          <Input
            label="Nombre Completo"
            placeholder="Juan Pérez"
            {...register('fullName')}
            error={errors.fullName?.message}
            autoComplete="name"
            className="bg-white/5 border-white/10 focus:border-brand-azul-brillante/50 transition-all"
          />

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            {...register('email')}
            error={errors.email?.message}
            autoComplete="email"
            className="bg-white/5 border-white/10 focus:border-brand-azul-brillante/50 transition-all"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
              autoComplete="new-password"
              className="bg-white/5 border-white/10 focus:border-brand-azul-brillante/50 transition-all"
            />

            <Input
              label="Confirmar Contraseña"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              className="bg-white/5 border-white/10 focus:border-brand-azul-brillante/50 transition-all"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full shadow-xl shadow-brand-azul-brillante/20 font-bold py-6 text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          isLoading={isLoading}
          size="lg"
        >
          Registrarse
        </Button>

        <p className="text-center text-sm text-text-muted mt-8">
          ¿Ya tienes una cuenta?{' '}
          <Link 
            to="/login" 
            className="text-brand-accent-neon hover:text-brand-azul-neon font-semibold transition-all hover:underline underline-offset-4"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
};