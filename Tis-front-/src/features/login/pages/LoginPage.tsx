import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-250px)] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-azul-electrico/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="w-full max-w-lg z-10 animate-in fade-in duration-1000">
        <LoginForm />
      </div>
    </div>
  );
};
