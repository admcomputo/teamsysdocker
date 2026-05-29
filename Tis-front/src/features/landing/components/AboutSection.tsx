export const AboutSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 lg:py-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8 tracking-tight px-2">
        ¿Qué es el Sistema Generador de Portafolios?
      </h2>
      <div className="bg-brand-azul-profundo/60 border border-card-border p-6 sm:p-10 md:p-14 rounded-2xl sm:rounded-[32px] backdrop-blur-md relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-azul-brillante/5 blur-[100px] rounded-full" />
        <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed relative z-10 font-light">
          El Sistema Generador de Portafolios es una plataforma online que permite a desarrolladores 
          crear, gestionar y compartir portafolios digitales de proyectos de software. 
          En un solo lugar podrás mostrar tus <span className="text-text-primary font-semibold border-b border-brand-azul-electrico/50 pb-0.5">proyectos de programación</span>, habilidades, 
          experiencia y logros de manera organizada y profesional.
        </p>
      </div>
    </section>
  );
};
