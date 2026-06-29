import { useEffect } from 'react';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { useAcademicTraining } from '../hooks/useAcademicTraining';
import { RichTextEditor } from "@/shared/components/ui/RichTextEditor";

export const AcademicTrainingForm = () => {
  const {
    institution, setInstitution,
    degree, setDegree,
    level, setLevel,
    fieldOfStudy, setFieldOfStudy,
    startDate, setStartDate,
    endDate, setEndDate,
    status, setStatus,
    description, setDescription,
    setCertificateTest,
    isPublic, setIsPublic,
    isLoading,
    isEditing,
    handleAddTraining,
    handleCancel,
    errors,
    setErrors,
  } = useAcademicTraining();

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayString();
  const showStatusField = endDate && endDate < today;

  useEffect(() => {
    const todayStr = getTodayString();
    if (!endDate) {
      if (status !== 'EN_CURSO') setStatus('EN_CURSO');
    } else if (endDate === todayStr) {
      if (status !== 'EN_CURSO') setStatus('EN_CURSO');
    } else if (endDate > todayStr) {
      if (status !== 'EN_CURSO') setStatus('EN_CURSO');
    } else {
      // endDate < todayStr
      if (status !== 'FINALIZADO' && status !== 'INCOMPLETO') {
        setStatus('');
      }
    }
  }, [endDate, status, setStatus]);

  return (
    <div className="w-full max-w-lg mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-accent-neon tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(47,128,237,0.3)]">
          {isEditing ? 'Editar Formación Académica' : 'Agregar Formación Académica'}
        </h2>
        <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
          Registra tu formación educativa y títulos obtenidos
        </p>
      </div>

      <form onSubmit={handleAddTraining} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Institución"
            type="text"
            placeholder="Ej. Universidad Mayor de San Simón"
            value={institution}
            onChange={(e) => {
  setInstitution(e.target.value);
  setErrors((prev) => ({ ...prev, institution: "" }));
}}
            className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
          />
{errors.institution && (
  <p className="text-red-500 text-sm mt-1">
    {errors.institution}
  </p>
)}

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Nivel
            </label>
            <select
              value={level}
              onChange={(e) => {
  setLevel(e.target.value);
  setErrors((prev) => ({ ...prev, level: "" }));
}}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-neon/50 transition-all duration-200"
            >
              <option value="" className="bg-brand-azul-profundo text-white">Seleccionar</option>
              <option value="PRIMARIA" className="bg-brand-azul-profundo text-white">Primaria</option>
              <option value="SECUNDARIA" className="bg-brand-azul-profundo text-white">Secundaria</option>
              <option value="TECNICO" className="bg-brand-azul-profundo text-white">Técnico</option>
              <option value="LICENCIATURA" className="bg-brand-azul-profundo text-white">Licenciatura</option>
              <option value="MAESTRIA" className="bg-brand-azul-profundo text-white">Maestría</option>
              <option value="DOCTORADO" className="bg-brand-azul-profundo text-white">Doctorado</option>
              <option value="DIPLOMADO" className="bg-brand-azul-profundo text-white">Diplomado</option>
              <option value="CURSOS" className="bg-brand-azul-profundo text-white">Cursos</option>
            </select>

{errors.level && (
  <p className="text-red-500 text-sm mt-1">
    {errors.level}
  </p>
)}
          </div>

{level !== 'PRIMARIA' &&
 level !== 'SECUNDARIA' &&
 level !== 'CURSOS' && (
  <>
    <Input
      label="Carrera"
      type="text"
      placeholder="Ej. Ingeniería de Sistemas"
      value={degree}
      onChange={(e) => {
  setDegree(e.target.value);
  setErrors((prev) => ({ ...prev, degree: ""}));
}}
      className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
    />

    {errors.degree && (
      <p className="text-red-500 text-sm mt-1">
        {errors.degree}
      </p>
    )}
  </>
)}
{level !== 'PRIMARIA' &&
 level !== 'SECUNDARIA' && (
  <>
    <Input
      label="Área de estudio"
      type="text"
      placeholder="Ej. Desarrollo de Software"
      value={fieldOfStudy}
      onChange={(e) => {
  setFieldOfStudy(e.target.value);
  setErrors((prev) => ({ ...prev, fieldOfStudy: "" }));
}}
      className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
    />

    {errors.fieldOfStudy && (
      <p className="text-red-500 text-sm mt-1">
        {errors.fieldOfStudy}
      </p>
    )}
  </>
)}

          <div className="grid grid-cols-2 gap-4">
  <div>
    <Input
      label="Fecha de inicio"
      type="date"
      value={startDate}
      onChange={(e) => {
  setStartDate(e.target.value);
  setErrors((prev) => ({ ...prev, startDate:""}));
}}
      max={endDate || today}
      className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
    />

    {errors.startDate && (
      <p className="text-red-500 text-sm mt-1">
        {errors.startDate}
      </p>
    )}
  </div>
         <div>
  <Input
    label="Fecha de finalización"
    type="date"
    value={endDate}
    onChange={(e) => {
  setEndDate(e.target.value);
  setErrors((prev) => ({ ...prev, endDate: "" }));
}}
    min={startDate}
    max={today}
    className="bg-white/5 border-white/10 focus:border-brand-accent-neon/50"
  />

  {errors.endDate && (
    <p className="text-red-500 text-sm mt-1">
      {errors.endDate}
    </p>
  )}
</div>
          </div>

          {showStatusField && (
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-medium text-text-secondary ml-1">
                Estado
              </label>
              <div className="flex flex-col gap-3 pl-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value="FINALIZADO"
                    checked={status === 'FINALIZADO'}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-4 h-4 accent-brand-accent-neon"
                  />
                  {errors.status && (
  <p className="text-red-500 text-sm mt-1">
    {errors.status}
  </p>
)}
                  <span className="text-sm text-text-primary group-hover:text-brand-accent-neon transition-colors">Finalizado</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value="INCOMPLETO"
                    checked={status === 'INCOMPLETO'}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-4 h-4 accent-brand-accent-neon"
                  />
                  {errors.status && (
  <p className="text-red-500 text-sm mt-1">
    {errors.status}
  </p>
)}
                  <span className="text-sm text-text-primary group-hover:text-brand-accent-neon transition-colors">Incompleto</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Descripción
            </label>
            <RichTextEditor
              value={description}
              onChange={(value) => {
  setDescription(value);
  setErrors((prev) => ({ ...prev, description: ""}));
}}
              placeholder="Ej. Enfoque en desarrollo web y bases de datos"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Prueba o Certificado (Opcional)
            </label>
            <input
              type="file"
              onChange={(e) => setCertificateTest(e.target.files ? e.target.files[0] : null)}
              className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent-neon/10 file:text-brand-accent-neon hover:file:bg-brand-accent-neon/20 transition-all cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-text-secondary ml-1">
              Privacidad
            </label>
            <div className="flex gap-4 pl-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="isPublic"
                  checked={isPublic === true}
                  onChange={() => setIsPublic(true)}
                  className="w-4 h-4 accent-brand-accent-neon"
                />
                <span className="text-sm text-text-primary group-hover:text-brand-accent-neon transition-colors">Público</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="isPublic"
                  checked={isPublic === false}
                  onChange={() => setIsPublic(false)}
                  className="w-4 h-4 accent-brand-accent-neon"
                />
                <span className="text-sm text-text-primary group-hover:text-brand-accent-neon transition-colors">Privado</span>
              </label>
            </div>
            <p className="text-xs text-text-muted ml-1 mt-1">
              {isPublic ? 'Se mostrará en tu portafolio público.' : 'Solo será visible para ti.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="flex-1 h-14 text-lg font-bold tracking-wide transition-all border-white/20 hover:bg-white/5"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1 h-14 text-lg font-bold tracking-wide shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};
