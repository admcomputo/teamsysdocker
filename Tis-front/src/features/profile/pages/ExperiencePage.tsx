import ExperienceSection from '../components/ExperienceSection';

export const ExperiencePage = () => {
  return (
    <div className="relative min-h-[calc(100vh-250px)] overflow-hidden px-4 py-16">
      <div className="absolute top-1/2 left-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-brand-azul-brillante/10 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand-azul-electrico/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl animate-in fade-in space-y-10 duration-1000">
        <ExperienceSection />
      </div>
    </div>
  );
};