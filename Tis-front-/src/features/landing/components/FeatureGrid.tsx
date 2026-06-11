import { Briefcase, Cpu, Lock } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeatureGrid = () => {
  const features = [
    {
      title: "Gestiona tus Proyectos",
      description: "Registra y presenta tus proyectos de desarrollo de manera clara y profesional para destacar tu experiencia.",
      icon: <Briefcase className="w-8 h-8" />
    },
    {
      title: "Muestra tus Habilidades",
      description: "Destaca tus habilidades técnicas y blandas para fortalecer tu CV y cautivar a posibles reclutadores.",
      icon: <Cpu className="w-8 h-8" />
    },
    {
      title: "Protege tu Información",
      description: "Mantén tus datos seguros y controla la visibilidad de tu portafolio con herramientas de privacidad avanzadas.",
      icon: <Lock className="w-8 h-8" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mx-auto px-4 py-10 lg:py-16">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};
