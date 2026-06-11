import { useState } from 'react';
import { useCVManagement } from '../hooks/useCVManagement';
import { Download, MoreVertical, Trash2, Edit2, Star, AlertCircle } from 'lucide-react';
import { CVType } from '../models/cv.model';

interface ManageCVsSectionProps {
  onBack: () => void;
  onViewOfficialCV?: () => void;
}

interface MenuOpenState {
  [key: string]: boolean;
}

export const ManageCVsSection = ({ onBack, onViewOfficialCV }: ManageCVsSectionProps) => {
  const { getCVs, getOfficialCV, setOfficialCV, removeOfficialCV, renameCVs, deleteCV, downloadCV } = useCVManagement();
  const [openMenus, setOpenMenus] = useState<MenuOpenState>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const cvs = getCVs();
  const officialCV = getOfficialCV();

  const toggleMenu = (cvId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [cvId]: !prev[cvId],
    }));
  };

  const startEdit = (cvId: string, currentName: string) => {
    setEditingId(cvId);
    setEditingName(currentName);
    setOpenMenus({});
  };

  const saveEdit = (cvId: string) => {
    if (editingName.trim()) {
      renameCVs(cvId, editingName);
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (cvId: string) => {
    deleteCV(cvId);
    setDeleteConfirm(null);
  };

  const handleSetOfficial = (cvId: string) => {
    setOfficialCV(cvId);
    setOpenMenus({});
  };

  const handleRemoveOfficial = (cvId: string) => {
    removeOfficialCV(cvId);
    setOpenMenus({});
  };

  const handleDownload = (cvId: string) => {
    downloadCV(cvId);
    setOpenMenus({});
  };

  const handleViewOfficialCV = () => {
    console.log('handleViewOfficialCV llamado');
    if (onViewOfficialCV) {
      onViewOfficialCV();
    } else {
      console.log('onViewOfficialCV NO EXISTE');
      // Fallback: abrir en nueva pestaña
      if (officialCV?.fileUrl) {
        window.open(officialCV.fileUrl, '_blank');
      }
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
            Mis CVs guardados
          </h2>
          <p className="text-text-secondary mt-1">
            Gestiona todos los CVs generados y subidos a tu perfil.
          </p>
        </div>
      </div>

      {cvs.length > 0 ? (
        <div className="space-y-4">
          {/* Lista de CVs */}
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${
                cv.isOfficial
                  ? 'bg-green-500/5 border-green-500/30'
                  : 'bg-card-bg/50 border-card-border hover:border-brand-azul-brillante/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Ícono de tipo */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    cv.type === CVType.GENERATED
                      ? 'bg-blue-500/10'
                      : 'bg-purple-500/10'
                  }`}
                >
                  {cv.type === CVType.GENERATED? (
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  )}
                </div>

                {/* Información del CV */}
                <div className="flex-1 min-w-0">
                  {editingId === cv.id ? (
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-3 py-1 bg-card-bg border border-card-border rounded-lg text-text-primary focus:outline-none focus:border-brand-azul-brillante"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(cv.id)}
                        className="px-3 py-1 rounded-lg bg-brand-azul-brillante hover:bg-brand-azul-brillante/90 text-white text-sm font-medium"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 rounded-lg border border-card-border hover:bg-card-border/30 text-text-secondary text-sm font-medium"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-semibold text-text-primary mb-1 truncate">
                      {cv.name}
                    </h3>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-text-secondary">
                      {cv.type === CVType.GENERATED ? 'Generado' : 'Subido'}
                    </span>
                    <span className="text-text-tertiary">•</span>
                    <span className="text-text-secondary">
                      {new Date(cv.createdAt).toLocaleDateString('es-MX')}
                    </span>
                    {cv.isOfficial && (
                      <>
                        <span className="text-text-tertiary">•</span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 font-medium">
                          <Star className="w-3 h-3" />
                          Actual
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Botón de menú */}
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(cv.id)}
                    className="p-2 hover:bg-card-border rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Menú desplegable */}
                  {openMenus[cv.id] && (
                    <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-card-border rounded-lg shadow-xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      {cv.isOfficial ? (
                        <button
                          onClick={() => handleRemoveOfficial(cv.id)}
                          className="w-full px-4 py-2 text-left hover:bg-card-border/50 transition-colors text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm"
                        >
                          <Star className="w-4 h-4" />
                          Quitar como oficial
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSetOfficial(cv.id)}
                          className="w-full px-4 py-2 text-left hover:bg-card-border/50 transition-colors text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm"
                        >
                          <Star className="w-4 h-4" />
                          Marcar como CV oficial
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(cv.id)}
                        className="w-full px-4 py-2 text-left hover:bg-card-border/50 transition-colors text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm border-t border-card-border"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </button>
                      <button
                        onClick={() => startEdit(cv.id, cv.name)}
                        className="w-full px-4 py-2 text-left hover:bg-card-border/50 transition-colors text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Cambiar nombre
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(cv.id)}
                        className="w-full px-4 py-2 text-left hover:bg-red-500/10 transition-colors text-red-600 hover:text-red-700 flex items-center gap-2 text-sm border-t border-card-border"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Botón para ver CV oficial */}
          {officialCV && (
            <div className="pt-4 border-t border-card-border">
              <button
                onClick={handleViewOfficialCV}
                className="w-full px-6 py-3 rounded-lg bg-green-500/10 border border-green-500/30 hover:bg-green-500/15 text-green-700 font-medium transition-colors"
              >
                Ver CV oficial
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 bg-card-bg border border-card-border rounded-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              No hay CVs guardados
            </h3>
            <p className="text-text-secondary">
              Genera tu primer CV desde tu portafolio o sube un CV personalizado.
            </p>
          </div>
        </div>
      )}

      {/* Diálogo de confirmación para eliminar */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg border border-card-border rounded-2xl max-w-sm w-full p-6 space-y-4 animate-in zoom-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Eliminar CV
              </h3>
            </div>

            <p className="text-text-secondary">
              ¿Estás seguro de que deseas eliminar este CV? Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-card-border hover:bg-card-border/30 text-text-primary font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
