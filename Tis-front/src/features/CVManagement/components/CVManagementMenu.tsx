import { FileText, Upload, Eye, Settings } from 'lucide-react';

interface CVManagementMenuProps {
  onSelectOption: (option: string) => void;
}

interface MenuOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const CVManagementMenu = ({ onSelectOption }: CVManagementMenuProps) => {
  const menuOptions: MenuOption[] = [
    {
      id: 'generate',
      title: 'Generar CV desde mi portafolio',
      description: 'Selecciona una plantilla y genera tu CV automáticamente',
      icon: <FileText className="w-8 h-8" />,
    },
    {
      id: 'upload',
      title: 'Subir CV propio',
      description: 'Sube tu CV personalizado en formato PDF',
      icon: <Upload className="w-8 h-8" />,
    },
    {
      id: 'view',
      title: 'Ver CV oficial',
      description: 'Visualiza el CV que se muestra en tu portafolio',
      icon: <Eye className="w-8 h-8" />,
    },
    {
      id: 'manage',
      title: 'Administrar mis CVs',
      description: 'Gestiona todos tus CVs generados y subidos',
      icon: <Settings className="w-8 h-8" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Gestión de Curriculum Vitae
        </h1>
        <p className="text-text-secondary">
          Crea, administra y visualiza tus CVs desde un solo lugar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            className="group relative bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl hover:border-brand-azul-brillante/50 hover:shadow-lg transition-all duration-300 text-left"
          >
            {/* Fondo con gradiente al hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-azul-brillante/0 to-brand-azul-brillante/0 group-hover:from-brand-azul-brillante/5 group-hover:to-brand-azul-brillante/10 rounded-2xl transition-all duration-300 -z-10" />

            <div className="flex items-start gap-4">
              <div className="text-brand-azul-brillante group-hover:scale-110 transition-transform duration-300">
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary text-lg mb-1 group-hover:text-brand-azul-brillante transition-colors">
                  {option.title}
                </h3>
                <p className="text-text-secondary text-sm">{option.description}</p>
              </div>
              <div className="text-text-tertiary group-hover:text-brand-azul-brillante transition-colors">
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
