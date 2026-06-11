import { useCVManagement } from '../hooks/useCVManagement';
import { AlertCircle } from 'lucide-react';

interface ViewCVSectionProps {
  onBack: () => void;
  onSelectAnotherCV?: () => void;
}

export const ViewCVSection = ({ onBack, onSelectAnotherCV }: ViewCVSectionProps) => {
  const { getOfficialCV } = useCVManagement();
  const officialCV = getOfficialCV();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Encabezado con botón atrás */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-card-border rounded-lg transition-colors"
          title="Volver"
        >
          <svg
            className="w-6 h-6 text-text-secondary hover:text-text-primary transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            CV oficial del perfil
          </h2>
          <p className="text-text-secondary mt-1">
            Este es el CV que actualmente se muestra en tu portafolio.
          </p>
        </div>
      </div>

      {officialCV ? (
        <div className="space-y-6">
          {/* Información del CV oficial */}
          <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-700">{officialCV.name}</h3>
              <p className="text-green-600/80 text-sm">
                Creado el {new Date(officialCV.createdAt).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>

          {/* Visor de PDF */}
          {officialCV && (
            <div className="bg-card-bg border border-card-border rounded-lg overflow-hidden">
              <iframe
                src={`${officialCV.fileUrl}#toolbar=0`}
                className="w-full h-[80vh]"
                title="Visor de CV"
              />
              <div className="bg-card-bg border-t border-card-border p-4 flex justify-between">
                <a
                  href={officialCV.fileUrl}
                  download
                  className="px-4 py-2 rounded-lg bg-brand-azul-brillante text-white font-medium"
                >
                  Descargar PDF
                </a>
                <a
                  href={officialCV.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-card-border"
                >
                  Abrir en nueva pestaña
                </a>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onSelectAnotherCV}
              className="flex-1 px-4 py-2 rounded-lg border border-card-border hover:bg-card-border/30 text-text-primary font-medium transition-colors"
            >
              Seleccionar otro CV
            </button>
            <button
              onClick={onBack}
              className="flex-1 px-4 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium transition-colors"
            >
              Volver a Gestión de CV
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-card-bg border border-card-border rounded-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              No hay CV oficial asignado
            </h3>
            <p className="text-text-secondary mb-6">
              Necesitas generar o subir un CV y establecerlo como oficial para que se muestre en tu portafolio.
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium transition-colors inline-block"
          >
            Volver a Gestión de CV
          </button>
        </div>
      )}
    </div>
  );
};
