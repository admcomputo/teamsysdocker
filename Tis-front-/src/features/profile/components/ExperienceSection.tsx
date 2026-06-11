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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successType, setSuccessType] = useState<'create' | 'edit' | null>(null);
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

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-green-500 text-green-500">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-slate-800">
  {successType === 'edit'
    ? '¡Experiencia actualizada!'
    : '¡Experiencia registrada!'}
</h3>

<p className="mb-6 text-slate-600">
  {successType === 'edit'
    ? 'La experiencia laboral se ha actualizado correctamente.'
    : 'La experiencia laboral se ha guardado correctamente.'}
</p>

            <button
              type="button"
              onClick={() => {
  setShowSuccessModal(false);
  setSuccessType(null);
}}
              className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;