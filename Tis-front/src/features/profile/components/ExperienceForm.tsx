import type { ExperienceErrors, ExperienceFormData, Technology } from '../models/experience.model';

interface ExperienceFormProps {
  formData: ExperienceFormData;
  errors: ExperienceErrors;
  saving: boolean;
  technologies: Technology[];
  onChange: (
  field: keyof ExperienceFormData,
  value: string | boolean | string[] | number[]
) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ExperienceForm = ({
  formData,
  errors,
  saving,
  technologies,
  onChange,
  onSubmit,
  onCancel,
}: ExperienceFormProps) => {
  return (
    <div className="rounded-2xl border border-[#1E3A5F] bg-[#142A4A] p-6 shadow-xl">
      <h2 className="mb-5 text-2xl font-bold text-[#E5E7EB]">
        Agregar experiencia laboral
      </h2>
      <h3 className="mb-3 text-sm font-bold text-[#38BDF8]">
  1. Información básica
</h3>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Empresa *
    </label>
    <input
      type="text"
      value={formData.empresa}
      onChange={(e) => onChange('empresa', e.target.value)}
      placeholder="Ej. Google, Microsoft"
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    />
    {errors.empresa && (
      <p className="mt-1 text-sm text-rose-400">{errors.empresa}</p>
    )}
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Cargo *
    </label>
    <input
      type="text"
      value={formData.cargo}
      onChange={(e) => onChange('cargo', e.target.value)}
      placeholder="Ej. Desarrollador Frontend"
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    />
    {errors.cargo && (
      <p className="mt-1 text-sm text-rose-400">{errors.cargo}</p>
    )}
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Área profesional *
    </label>
    <select
      value={formData.areaProfesional}
      onChange={(e) => onChange('areaProfesional', e.target.value)}
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    >
      <option value="">Selecciona área profesional</option>
      <option value="Desarrollo de Software">Desarrollo de Software</option>
      <option value="Diseño UI/UX">Diseño UI/UX</option>
      <option value="Ciberseguridad">Ciberseguridad</option>
      <option value="Data Science">Data Science</option>
    </select>
    {errors.areaProfesional && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.areaProfesional}
      </p>
    )}
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Especialización *
    </label>
    <select
      value={formData.especializacion}
      onChange={(e) => onChange('especializacion', e.target.value)}
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    >
      <option value="">Selecciona especialización</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="Full Stack">Full Stack</option>
      <option value="Desarrollo Móvil">Desarrollo Móvil</option>
    </select>
    {errors.especializacion && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.especializacion}
      </p>
    )}
  </div>
</div>

<h3 className="mb-3 mt-5 text-sm font-bold text-[#38BDF8]">
  2. Periodo laboral
</h3>

<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Período de inicio *
    </label>
    <input
      type="month"
      value={formData.fechaInicio}
      onChange={(e) => onChange('fechaInicio', e.target.value)}
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    />
    {errors.fechaInicio && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.fechaInicio}
      </p>
    )}
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Período de fin *
    </label>
    <input
      type="month"
      value={formData.fechaFin}
      onChange={(e) => onChange('fechaFin', e.target.value)}
      disabled={formData.esTrabajoActual}
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    />
    {errors.fechaFin && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.fechaFin}
      </p>
    )}
  </div>
</div>

<div className="mt-4">
  <label className="flex items-center gap-2 text-sm text-[#E5E7EB]">
    <input
      type="checkbox"
      checked={formData.esTrabajoActual}
      onChange={(e) => onChange('esTrabajoActual', e.target.checked)}
      className="h-4 w-4 accent-[#3B82F6]"
    />
    Actualmente trabajo aquí
  </label>
</div>

<h3 className="mb-3 mt-5 text-sm font-bold text-[#38BDF8]">
  3. Modalidad y ubicación
</h3>

<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Modalidad de trabajo *
    </label>
    <select
      value={formData.modalidadTrabajo}
      onChange={(e) => onChange('modalidadTrabajo', e.target.value)}
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    >
      <option value="">Selecciona modalidad</option>
<option value="REMOTO">Remoto</option>
<option value="PRESENCIAL">Presencial</option>
<option value="HIBRIDO">Híbrido</option>
    </select>
    {errors.modalidadTrabajo && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.modalidadTrabajo}
      </p>
    )}
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Ubicación *
    </label>
    <input
      type="text"
      value={formData.ubicacion}
      onChange={(e) => onChange('ubicacion', e.target.value)}
      placeholder="Ej. Cochabamba, Bolivia"
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    />
    {errors.ubicacion && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.ubicacion}
      </p>
    )}
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
      Tipo de contrato *
    </label>
    <select
      value={formData.tipoContrato}
      onChange={(e) => onChange('tipoContrato', e.target.value)}
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    >
      <option value="">Selecciona tipo</option>
<option value="TIEMPO_COMPLETO">Tiempo completo</option>
<option value="MEDIO_TIEMPO">Medio tiempo</option>
<option value="FREELANCE">Freelance</option>
<option value="PASANTIA">Pasantía</option>
<option value="CONTRATO_TEMPORAL">Contrato temporal</option>
    </select>
    {errors.tipoContrato && (
      <p className="mt-1 text-sm text-rose-400">
        {errors.tipoContrato}
      </p>
    )}
  </div>
</div>

<h3 className="mb-3 mt-5 text-sm font-bold text-[#38BDF8]">
  4. Tecnologías y herramientas
</h3>



<div>
  <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
    Tecnologías / herramientas utilizadas *
  </label>

  <select
    onChange={(e) => {
  const selectedId = Number(e.target.value);

  if (!selectedId) return;

  if (formData.tecnologiasIds.includes(selectedId)) {
    e.target.value = '';
    return;
  }

  const selectedName = e.target.options[e.target.selectedIndex].text;

  onChange('tecnologiasIds', [...formData.tecnologiasIds, selectedId]);
  onChange('tecnologiasHerramientas', [
    ...formData.tecnologiasHerramientas,
    selectedName,
  ]);

  setTimeout(() => {
    e.target.value = '';
  }, 0);
}}
    className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
  >
    <option value="">Selecciona tecnología</option>
   {technologies.map((tech) => (
  <option key={tech.id} value={tech.id}>
    {tech.nombre}
  </option>
))}
  </select>

  <div className="mt-3 flex flex-wrap gap-2">
    {formData.tecnologiasHerramientas.map((tech, index) => (
      <span
        key={tech}
        className="flex items-center gap-2 rounded-full bg-[#1E3A5F] px-3 py-1 text-sm text-[#E5E7EB]"
      >
        {tech}

        <button
          type="button"
          onClick={() => {
            onChange(
              'tecnologiasHerramientas',
              formData.tecnologiasHerramientas.filter(
                (_, i) => i !== index,
              ),
            );

            onChange(
              'tecnologiasIds',
              formData.tecnologiasIds.filter(
                (_, i) => i !== index,
              ),
            );
          }}
          className="text-[#9CA3AF] hover:text-red-400"
        >
          ×
        </button>
      </span>
    ))}
  </div>

  {errors.tecnologiasIds && (
    <p className="mt-1 text-sm text-rose-400">
      {errors.tecnologiasIds}
    </p>
  )}
</div>




<h3 className="mb-3 mt-5 text-sm font-bold text-[#38BDF8]">
  5. Descripción del proyecto
</h3>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
          Descripción del proyecto y responsabilidades *
        </label>
        <textarea
          value={formData.descripcion}
          onChange={(e) => onChange('descripcion', e.target.value)}
          placeholder="Describe tus funciones, responsabilidades o logros"
          rows={5}
          className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
        />
        {errors.descripcion && (
          <p className="mt-1 text-sm text-rose-400">{errors.descripcion}</p>
        )}
      </div>

<h3 className="mb-3 mt-5 text-sm font-bold text-[#38BDF8]">
  6. Evidencias
</h3>
<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

  <div>
  <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
    Subir evidencia laboral (PDF)
  </label>

  <div className="flex items-center gap-2">
    <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#9CA3AF] transition hover:border-[#3B82F6]">
      <span>
        {formData.evidenciaLaboralPdfUrl
          ? formData.evidenciaLaboralPdfUrl
          : 'Seleccionar archivo PDF'}
      </span>

      <span className="text-[#38BDF8]">📎</span>

      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onChange('evidenciaLaboralPdfUrl', file.name);
          }
        }}
      />
    </label>

    {formData.evidenciaLaboralPdfUrl && (
      <button
        type="button"
        onClick={() => onChange('evidenciaLaboralPdfUrl', '')}
        className="rounded-xl border border-red-500/40 px-4 py-3 text-red-400 transition hover:bg-red-500/10"
        title="Quitar PDF"
      >
        ×
      </button>
    )}
  </div>
</div>

  <div>
  <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
    URL de proyecto relacionado
  </label>

  <div className="flex gap-2">
    <input
      type="url"
      value={formData.proyectoRelacionadoUrl}
      onChange={(e) =>
        onChange('proyectoRelacionadoUrl', e.target.value)
      }
      placeholder="https://github.com/usuario/proyecto"
      className="w-full rounded-xl border border-[#1E3A5F] bg-[#0F223D] px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
    />

    <button
      type="button"
      onClick={() => {
        try {
          const url = new URL(formData.proyectoRelacionadoUrl);

          if (url.protocol === 'http:' || url.protocol === 'https:') {
            window.open(url.href, '_blank');
          }
        } catch {
          return;
        }
      }}
      disabled={!formData.proyectoRelacionadoUrl.trim()}
      className="rounded-xl bg-[#1E3A5F] px-4 py-3 text-[#38BDF8] transition hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50"
      title="Abrir enlace"
    >
      🔗
    </button>
  </div>
</div>
</div>


      <div className="mt-6 flex justify-end gap-3">
  <button
    type="button"
    onClick={onCancel}
    disabled={saving}
    className="rounded-xl border border-[#1E3A5F] bg-transparent px-5 py-3 font-medium text-[#E5E7EB] transition hover:bg-[#1E3A5F]/30 disabled:cursor-not-allowed disabled:opacity-70"
  >
    Cancelar
  </button>

  <button
    type="button"
    onClick={onSubmit}
    disabled={saving}
    className="rounded-xl bg-[#3B82F6] px-5 py-3 font-medium text-white transition hover:bg-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-70"
  >
    {saving ? 'Guardando...' : 'Guardar experiencia'}
  </button>
   </div>
    </div>  
  );
};
export default ExperienceForm;