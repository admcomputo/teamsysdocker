import type { Experience } from '../models/experience.model';

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id: number) => void;
}

const formatPeriod = (experience: Experience) => {
  const inicio = experience.fechaInicio || 'Sin fecha';
  const fin = experience.esTrabajoActual
    ? 'Actualidad'
    : experience.fechaFin || 'Sin fecha';

  return `${inicio} - ${fin}`;
};

const ExperienceCard = ({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) => {
  return (
    <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-5 shadow-lg transition hover:bg-[#1A3355]">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#E5E7EB]">
            {experience.empresa}
          </h3>
          <p className="text-sm font-medium text-[#60A5FA]">{experience.cargo}</p>
        </div>

        <div className="flex items-start gap-2">
          <span className="rounded-full border border-[#1E3A5F] bg-[#0F223D] px-3 py-1 text-xs text-[#9CA3AF]">
            {formatPeriod(experience)}
          </span>

          <button
            type="button"
            onClick={() => onEdit(experience)}
            className="rounded-lg border border-[#1E3A5F] bg-[#0F223D] p-2 text-[#E5E7EB] transition hover:bg-[#1E3A5F]"
            title="Editar"
          >
            ✏️
          </button>

          <button
            type="button"
            onClick={() => onDelete(experience.id)}
            className="rounded-lg border border-[#1E3A5F] bg-[#0F223D] p-2 text-rose-400 transition hover:bg-rose-500/10"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="text-sm leading-6 text-[#9CA3AF]">
        {experience.descripcion}
      </p>
    </div>
  );
};

export default ExperienceCard;