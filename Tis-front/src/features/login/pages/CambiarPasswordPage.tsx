import { ResetPasswordForm } from '../components/ResetPasswordForm';

export const CambiarPasswordPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-250px)] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-azul-electrico/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-lg z-10 animate-in fade-in duration-1000">
        <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
              Restablecer Contraseña
            </h2>
            <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
              Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
            </p>
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};
