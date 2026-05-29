import type { Experience } from '../models/experience.model';
import ExperienceCard from './ExperienceCard';

interface ExperienceListProps {
  experiences: Experience[];
  loading: boolean;
  onEdit: (experience: Experience) => void;
  onDelete: (id: number) => void;
}

const ExperienceList = ({
  experiences,
  loading,
  onEdit,
  onDelete,
}: ExperienceListProps) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-6 text-center text-[#9CA3AF] shadow-md">
        Cargando experiencias...
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-6 text-center text-[#9CA3AF] shadow-md">
        Aún no registraste experiencia laboral.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExperienceList;