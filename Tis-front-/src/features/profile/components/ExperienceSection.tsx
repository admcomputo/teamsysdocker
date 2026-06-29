import { useState } from 'react';
import ExperienceForm from './ExperienceForm';
import ExperienceList from './ExperienceList';
import ExperienceMessage from './ExperienceMessage';
import { useExperience } from '../hooks/useExperience';

const ExperienceSection = () => {
  const {
    formData,
    errors,
    experiences,
    loading,
    saving,
    message,
    technologies,
    handleChange,
    submitExperience,
    closeMessage,
    startEditing,
    removeExperience,
    cancelEditing,
    editingExperience,
  } = useExperience();

  const [showForm, setShowForm] = useState(false);
  const [ _showSuccessModal ,setShowSuccessModal] = useState(false);

  const [ _SuccessType,setSuccessType] = useState<'create' | 'edit' | null>(null);
  const handleSubmit = async () => {
  const currentAction = editingExperience ? 'edit' : 'create';
  const ok = await submitExperience();

  if (ok) {
    setShowForm(false);
    setSuccessType(currentAction);
    setShowSuccessModal(true);
  }
};

  const handleCancel = () => {
    setShowForm(false);
    cancelEditing();
    closeMessage();
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">
            Experiencia laboral
          </h2>
          <p className="mt-1 text-text-secondary">
            Registra tus experiencias laborales para fortalecer tu perfil profesional.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={() => {
              cancelEditing();
              setShowForm(true);
            }}
            className="rounded-xl bg-brand-morado px-5 py-3 font-medium text-white transition hover:opacity-90"
          >
            + Agregar experiencia
          </button>
        )}
      </div>

      {message && (
        <ExperienceMessage
          type={message.type}
          text={message.text}
          onClose={closeMessage}
        />
      )}

      {showForm && (
        <ExperienceForm
          formData={formData}
          errors={errors}
          saving={saving}
          technologies={technologies}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <ExperienceList
        experiences={experiences}
        loading={loading}
        onEdit={(experience) => {
          startEditing(experience);
          setShowForm(true);
        }}
        onDelete={removeExperience}
      />


    </section>
  );
};

export default ExperienceSection;