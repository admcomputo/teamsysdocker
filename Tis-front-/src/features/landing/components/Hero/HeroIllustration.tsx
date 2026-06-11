export const HeroIllustration = () => {
  return (
    <div className="flex-1 relative w-full max-w-sm md:max-w-md lg:max-w-lg animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
      {/* Main Laptop Illustration with Blending Mask */}
      <div className="relative z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] lg:[mask-image:none]">
        <div className="relative [mask-image:radial-gradient(50%_50%_at_50%_50%,black_60%,transparent_100%)]">
          <img 
            src="/landing_hero_illustration.png" 
            alt="Software Portfolio Generator Illustration" 
            className="w-full h-auto object-cover scale-x-[-1] brightness-110 contrast-110"
          />
        </div>
      </div>

      {/* Global floating UI elements - Hidden on mobile to prevent clutter/overflow */}
      <div className="hidden lg:block absolute top-0 -right-4 w-44 h-28 bg-brand-azul-profundo/60 backdrop-blur-xl rounded-xl border border-white/5 animate-float-delayed shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 p-5">
        <div className="space-y-3">
          <div className="w-full h-2 bg-brand-azul-electrico/20 rounded" />
          <div className="w-3/4 h-2 bg-brand-azul-electrico/20 rounded" />
          <div className="w-1/2 h-2 bg-brand-azul-electrico/20 rounded" />
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-12 -left-18 w-44 h-28 bg-brand-azul-profundo/60 backdrop-blur-xl rounded-xl border border-white/5 animate-float-delayed shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 p-5">
        <div className="space-y-3">
          <div className="w-full h-2 bg-brand-azul-electrico/20 rounded" />
          <div className="w-3/4 h-2 bg-brand-azul-electrico/20 rounded" />
          <div className="w-1/2 h-2 bg-brand-azul-electrico/20 rounded" />
        </div>
      </div> 

      {/* Particle/Star effects - simplified for mobile */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-soft-pulse" />
      <div className="hidden md:block absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-brand-azul-neon/50 rounded-full animate-soft-pulse delay-700" />
      <div className="hidden md:block absolute bottom-1/4 left-1/2 w-1 h-1 bg-brand-celeste-suave/50 rounded-full animate-soft-pulse delay-1000" />

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand-azul-brillante/15 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
};
