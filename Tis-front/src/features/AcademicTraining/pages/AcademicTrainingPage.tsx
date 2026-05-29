import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAcademicTrainingList } from '../hooks/useAcademicTrainingList';
import { Button } from '@shared/components/ui/Button';

export const AcademicTrainingPage = () => {
  const { trainings, searchTerm, setSearchTerm, isLoading, handleDelete } = useAcademicTrainingList();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      await handleDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            Formación Académica
          </h1>
          <p className="text-text-secondary mt-1">
            Gestiona tus estudios y títulos obtenidos.
          </p>
        </div>
        <Link to="/AcademicTraining/new">
          <Button className="w-full md:w-auto shadow-lg hover:shadow-brand-accent-neon/20 transition-all group">
            <span className="mr-2 group-hover:scale-110 transition-transform">+</span>
            Adicionar Formación
          </Button>
        </Link>
      </div>

      <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Buscar por institución, carrera o área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent-neon/50 transition-all"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-brand-accent-neon border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : trainings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">No se encontraron registros de formación académica.</p>
            {searchTerm && (
              <p className="text-sm text-text-muted">Prueba con otros términos de búsqueda.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trainings.map((training) => (
              <div key={training.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-brand-accent-neon/50 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-accent-neon/10 text-brand-accent-neon">
                    {training.level}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${training.status === 'FINALIZADO' ? 'bg-green-500/10 text-green-400' : training.status === 'EN_CURSO' ? 'bg-blue-500/10 text-blue-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {training.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-brand-accent-neon transition-colors line-clamp-2">
                  {training.degree}
                </h3>
                <p className="text-text-secondary font-medium mb-3">{training.institution}</p>
                <div className="space-y-2 text-sm text-text-muted">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {training.fieldOfStudy}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(training.startDate).toLocaleDateString()} {training.endDate ? `- ${new Date(training.endDate).toLocaleDateString()}` : '(Presente)'}
                  </p>
                  {training.certificateUrl && (
                    <a 
                      href={training.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-brand-accent-neon hover:text-brand-accent-neon/80 transition-colors pt-1 font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      Ver Certificado
                    </a>
                  )}
                </div>
                <div className="mt-4 flex gap-2 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    to={`/AcademicTraining/edit/${training.id}`}
                    state={{ training }}
                    className="flex-1 bg-brand-accent-neon/10 hover:bg-brand-accent-neon/20 text-brand-accent-neon font-medium text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Editar
                  </Link>
                  <button 
                    onClick={() => training.id && setDeleteConfirmId(training.id)}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-brand-azul-profundo border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-2">Confirmar Eliminación</h3>
            <p className="text-text-secondary text-sm mb-6">
              ¿Estás seguro de que quieres eliminar esta formación académica? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors shadow-lg shadow-red-500/25"
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
