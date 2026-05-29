import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@shared/components/ui/Button';
import { HeroIllustration } from './Hero/HeroIllustration';

export const HeroSection = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-12 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent-neon/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="flex-[1.5] text-center lg:text-left flex flex-col items-center lg:items-start animate-in fade-in slide-in-from-left-8 duration-1000 z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-high-fidelity mb-6 lg:mb-8 leading-[1.2] lg:leading-[1.1] tracking-tight lg:whitespace-normal">
          ¡Bienvenido al Sistema <br className="hidden md:block" />
          <span className="text-brand-accent-neon drop-shadow-[0_0_15px_rgba(97,255,209,0.4)]">
            Generador de Portafolios!
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-text-muted max-w-xl mb-8 lg:mb-12 leading-relaxed font-light">
          Crea y gestiona portafolios digitales de proyectos de software 
          para mostrar tus habilidades y logros de manera profesional.
        </p>
        
        <Link to="/register">
          <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-brand-azul-brillante/30 hover:scale-105 transition-all active:scale-95 font-semibold px-12 group">
            Registrarse
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <HeroIllustration />
    </section>
  );
};
