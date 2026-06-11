import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAcademicTrainingList } from '../hooks/useAcademicTrainingList';
import { Button } from '@shared/components/ui/Button';
import type { AcademicTraining } from '../models/academicTraining.model';

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const LEVEL_ORDER = [
  'PRIMARIA', 'SECUNDARIA', 'TECNICO', 'LICENCIATURA',
  'MAESTRIA', 'DOCTORADO', 'DIPLOMADO', 'CURSOS',
] as const;

const LEVEL_LABELS: Record<string, string> = {
  PRIMARIA: 'Primaria',
  SECUNDARIA: 'Secundaria',
  TECNICO: 'Técnico',
  LICENCIATURA: 'Licenciatura',
  MAESTRIA: 'Maestría',
  DOCTORADO: 'Doctorado',
  DIPLOMADO: 'Diplomado',
  CURSOS: 'Cursos',
};

const LEVEL_COLORS: Record<string, { badge: string; glow: string; dot: string }> = {
  PRIMARIA: { badge: 'bg-slate-500/15  text-slate-300  border-slate-500/30', glow: 'hover:border-slate-400/50', dot: 'bg-slate-400' },
  SECUNDARIA: { badge: 'bg-zinc-500/15   text-zinc-300   border-zinc-500/30', glow: 'hover:border-zinc-400/50', dot: 'bg-zinc-400' },
  TECNICO: { badge: 'bg-cyan-500/15   text-cyan-300   border-cyan-500/30', glow: 'hover:border-cyan-400/50', dot: 'bg-cyan-400' },
  LICENCIATURA: { badge: 'bg-blue-500/15   text-blue-300   border-blue-500/30', glow: 'hover:border-blue-400/50', dot: 'bg-blue-400' },
  MAESTRIA: { badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30', glow: 'hover:border-violet-400/50', dot: 'bg-violet-400' },
  DOCTORADO: { badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30', glow: 'hover:border-purple-400/50', dot: 'bg-purple-400' },
  DIPLOMADO: { badge: 'bg-amber-500/15  text-amber-300  border-amber-500/30', glow: 'hover:border-amber-400/50', dot: 'bg-amber-400' },
  CURSOS: { badge: 'bg-green-500/15  text-green-300  border-green-500/30', glow: 'hover:border-green-400/50', dot: 'bg-green-400' },
};

/** Parse YYYY-MM-DD without timezone shift */
const parseLocalDate = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const formatDate = (dateStr?: string | null) => {
  const d = parseLocalDate(dateStr);
  if (!d) return null;
  return d.toLocaleDateString('es-BO', { year: 'numeric', month: 'short', day: 'numeric' });
};

const STATUS_STYLES: Record<string, string> = {
  FINALIZADO: 'bg-green-500/10 text-green-400 border-green-500/30',
  EN_CURSO: 'bg-blue-500/10  text-blue-400  border-blue-500/30',
  INCOMPLETO: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
};

const STATUS_LABELS: Record<string, string> = {
  FINALIZADO: 'Finalizado',
  EN_CURSO: 'En curso',
  INCOMPLETO: 'Incompleto',
};

/* ------------------------------------------------------------------ */
/* Card                                                                  */
/* ------------------------------------------------------------------ */
const TrainingCard = ({
  training,
  onDelete,
  onTogglePrivacy,
}: {
  training: AcademicTraining;
  onDelete: (id: string) => void;
  onTogglePrivacy: (training: AcademicTraining) => void;
}) => {
  const levelKey = (training.level ?? '').toUpperCase();
  const colors = LEVEL_COLORS[levelKey] ?? LEVEL_COLORS['CURSO'];
  const statusStyle = STATUS_STYLES[training.status] ?? 'bg-white/5 text-white/60 border-white/10';

  return (
    <div
      className={`relative bg-white/[0.03] border border-white/10 rounded-2xl p-5 transition-all duration-300 group ${colors.glow}`}
    >
      {/* Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${statusStyle}`}>
            {STATUS_LABELS[training.status] ?? training.status}
          </span>
          <button
            onClick={() => onTogglePrivacy(training)}
            title={`Actualmente: ${training.isPublic ? 'Público' : 'Privado'}. Clic para cambiar.`}
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-colors flex items-center gap-1.5 ${
              training.isPublic
                ? 'bg-brand-accent-neon/10 text-brand-accent-neon border-brand-accent-neon/30 hover:bg-brand-accent-neon/20'
                : 'bg-white/5 text-text-secondary border-white/10 hover:bg-white/10'
            }`}
          >
            {training.isPublic ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Público
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                Privado
              </>
            )}
          </button>
        </div>
        {training.certificateUrl && (
          <a
            href={training.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-brand-accent-neon hover:underline"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Certificado
          </a>
        )}
      </div>

      {/* Content */}
      <h3 className="text-base font-bold text-text-primary group-hover:text-brand-accent-neon transition-colors line-clamp-2 mb-1">
        {training.degree}
      </h3>
      <p className="text-sm font-medium text-text-secondary mb-3">{training.institution}</p>

      <div className="flex flex-col gap-1.5 text-xs text-text-muted">
        {training.fieldOfStudy && (
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {training.fieldOfStudy}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(training.startDate)}
          {training.endDate ? ` — ${formatDate(training.endDate)}` : ' — Presente'}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-white/8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link
          to={`/AcademicTraining/edit/${training.id}`}
          state={{ training }}
          className="flex-1 bg-brand-accent-neon/10 hover:bg-brand-accent-neon/20 text-brand-accent-neon font-medium text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar
        </Link>
        <button
          onClick={() => training.id && onDelete(training.id)}
          className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export const AcademicTrainingPage = () => {
  const { trainings, searchTerm, setSearchTerm, isLoading, handleDelete, handleTogglePrivacy } =
    useAcademicTrainingList();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      await handleDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  // Group by level in the defined order
  const groups = LEVEL_ORDER
    .map(levelKey => ({
      levelKey,
      label: LEVEL_LABELS[levelKey],
      items: trainings.filter(
        t => (t.level ?? '').toUpperCase() === levelKey
      ),
      colors: LEVEL_COLORS[levelKey],
    }))
    .filter(g => g.items.length > 0);

  // Items whose level is not in the known list
  const unknownItems = trainings.filter(
    t => !LEVEL_ORDER.includes((t.level ?? '').toUpperCase() as typeof LEVEL_ORDER[number])
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
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

      {/* Search */}
      <div className="relative">
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

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-brand-accent-neon border-t-transparent rounded-full animate-spin" />
        </div>
      ) : trainings.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] border border-white/8 rounded-2xl">
          <svg className="w-12 h-12 mx-auto mb-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 7V9m0 12l9-5M3 16l9 5" />
          </svg>
          <p className="text-text-secondary mb-2">No se encontraron registros de formación académica.</p>
          {searchTerm && <p className="text-sm text-text-muted">Prueba con otros términos de búsqueda.</p>}
        </div>
      ) : (
        <div className="space-y-10">
          {groups.map(({ levelKey, label, items, colors }) => (
            <section key={levelKey}>
              {/* Level heading */}
              <div className="flex items-center gap-3 mb-5">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors.dot}`} />
                <h2 className="text-lg font-semibold text-text-primary tracking-tight">{label}</h2>
                <span className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full border ${colors.badge}`}>
                  {items.length}
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map(training => (
                  <TrainingCard
                    key={training.id}
                    training={training}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onTogglePrivacy={handleTogglePrivacy}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* Unknown levels */}
          {unknownItems.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-white/30" />
                <h2 className="text-lg font-semibold text-text-primary tracking-tight">Otros</h2>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {unknownItems.map(training => (
                  <TrainingCard
                    key={training.id}
                    training={training}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onTogglePrivacy={handleTogglePrivacy}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Delete confirmation modal */}
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
