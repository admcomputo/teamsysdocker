import { Link } from 'react-router-dom';
import { Button } from '@shared/components/ui/Button';

export const CallToAction = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-24 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="relative p-12 md:p-20 rounded-[40px] bg-gradient-to-b from-bg-secondary to-bg-dark border border-card-border overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-brand-azul-brillante/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 tracking-tight relative z-10 leading-tight">
          ¡Empieza a crear tu portafolio profesional ahora mismo!
        </h2>
        
        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto relative z-10 leading-relaxed font-light">
          Registrate y muestra al mundo lo que puedes hacer como desarrollador de software.
        </p>
        
        <Link to="/register" className="relative z-10">
          <Button size="lg" className="rounded-full px-12 py-7 text-xl shadow-xl shadow-brand-azul-brillante/40 hover:scale-110 hover:shadow-brand-azul-brillante/60 transition-all active:scale-95">
            Registrarse
          </Button>
        </Link>
        
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-azul-electrico/10 rounded-full blur-3xl" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-azul-brillante/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
