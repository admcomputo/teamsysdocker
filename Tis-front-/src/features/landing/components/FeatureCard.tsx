import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="flex flex-col p-8 bg-brand-azul-profundo/40 backdrop-blur-md rounded-[32px] border border-card-border/50 hover:border-brand-accent-neon/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(97,255,209,0.1)] transition-all duration-300 group cursor-default">
      <div className="p-4 bg-brand-azul-brillante/10 rounded-xl w-fit mb-6 text-brand-azul-brillante transition-all duration-300 group-hover:bg-brand-accent-neon/20 group-hover:text-brand-accent-neon group-hover:scale-110">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight group-hover:text-brand-accent-neon transition-colors">
        {title}
      </h3>
      
      <p className="text-text-secondary text-base leading-relaxed font-light mb-6">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-2 text-brand-azul-brillante font-semibold text-sm opacity-0 group-hover:opacity-100 group-hover:text-brand-accent-neon transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
        Saber más 
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
};
