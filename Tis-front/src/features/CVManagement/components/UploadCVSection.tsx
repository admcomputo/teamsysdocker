import { useState, useRef } from 'react';
import { useCVManagement } from '../hooks/useCVManagement';
import { CVLoadingState } from '../models/cv.model';
import { Upload, AlertCircle, FileText } from 'lucide-react';

interface UploadCVSectionProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export const UploadCVSection = ({ onBack, onSuccess }: UploadCVSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPdf, loadingState, error } = useCVManagement();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [makeOfficial, setMakeOfficial] = useState(true);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validar que sea PDF
    if (file.type !== 'application/pdf') {
      // Mostrar error aquí
      console.error('Solo se permiten archivos PDF');
      return;
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('El archivo es demasiado grande (máximo 10MB)');
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadPdf(
        selectedFile,
        selectedFile.name.replace(/\.pdf$/i, ''),
        makeOfficial
      );

      setShowConfirmDialog(false);
      setSelectedFile(null);
      onSuccess?.();
    } catch (err) {
      console.error('Error registrando CV:', err);
    }
  };

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
            Subir CV personalizado
          </h2>
          <p className="text-text-secondary mt-1">
            Selecciona o arrastra un archivo PDF para subirlo a tu perfil.
          </p>
        </div>
      </div>

      {/* Zona de carga */}
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${dragActive
              ? 'border-brand-azul-brillante bg-brand-azul-brillante/5'
              : 'border-card-border hover:border-brand-azul-brillante/50 hover:bg-card-border/30'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-azul-brillante/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-brand-azul-brillante" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">
                Arrastra tu CV aquí o selecciona un archivo PDF
              </h3>
              <p className="text-text-secondary text-sm">
                Máximo 10MB • Formato: PDF
              </p>
            </div>
            <button
              type="button"
              className="px-6 py-2 mt-4 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium transition-colors"
            >
              Seleccionar archivo
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Archivo seleccionado */}
          <div className="bg-card-bg/50 border border-card-border rounded-lg p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary truncate">
                {selectedFile.name}
              </h4>
              <p className="text-text-secondary text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-2 hover:bg-card-border rounded-lg transition-colors text-text-secondary hover:text-text-primary"
            >
              ✕
            </button>
          </div>

          {/* URL temporal del PDF */}
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              El archivo PDF se subirá directamente a Cloudinary y luego se guardará en tu perfil.
            </p>
          </div>

          {/* Checkbox para marcar como oficial */}
          <label className="flex items-center gap-3 p-4 bg-card-bg/50 border border-card-border rounded-lg cursor-pointer hover:border-brand-azul-brillante/30 transition-colors">
            <input
              type="checkbox"
              checked={makeOfficial}
              onChange={(e) => setMakeOfficial(e.target.checked)}
              className="w-4 h-4 rounded border-card-border bg-card-bg checked:bg-brand-azul-brillante cursor-pointer"
            />
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">
                Establecer como CV oficial
              </h4>
              <p className="text-text-secondary text-sm">
                Este CV se mostrará en tu portafolio. Podrás cambiar esto después.
              </p>
            </div>
          </label>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setSelectedFile(null)}
              disabled={loadingState === CVLoadingState.LOADING}
              className="flex-1 px-4 py-2 rounded-lg border border-card-border hover:bg-card-border/30 text-text-primary font-medium disabled:opacity-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => setShowConfirmDialog(true)}
              disabled={loadingState === CVLoadingState.LOADING}
              className="flex-1 px-4 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium disabled:opacity-50 transition-colors"
            >
              Subir CV al perfil
            </button>
          </div>
        </div>
      )}

      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg border border-card-border rounded-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-azul-brillante/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-brand-azul-brillante" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Confirmar subida de CV
              </h3>
            </div>

            <p className="text-text-secondary">
              Este CV se subirá a tu perfil {makeOfficial ? 'y será marcado como CV oficial' : ''}.
              También podrás cambiarlo después desde tu lista de CVs.
            </p>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                disabled={loadingState === CVLoadingState.LOADING}
                className="flex-1 px-4 py-2 rounded-lg border border-card-border hover:bg-card-border/30 text-text-primary font-medium disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpload}
                disabled={loadingState === CVLoadingState.LOADING}
                className="flex-1 px-4 py-2 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white font-medium disabled:opacity-50 transition-colors"
              >
                {loadingState === CVLoadingState.LOADING
                  ? 'Subiendo...' 
                  : makeOfficial
                  ? 'Subir y establecer como oficial'
                  : 'Subir CV al perfil'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de carga */}
      {loadingState === CVLoadingState.LOADING && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8 text-center space-y-4 animate-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-full border-4 border-card-border border-t-brand-azul-brillante animate-spin mx-auto" />
            <p className="text-text-primary font-medium">
              Subiendo tu CV, por favor espera...
            </p>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-600">Error</h4>
            <p className="text-red-500/80 text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
