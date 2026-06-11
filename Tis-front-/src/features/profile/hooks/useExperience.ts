import { useEffect, useState } from 'react';
import type {
  Experience,
  ExperienceErrors,
  ExperienceFormData,
  ExperienceMessage,
  Technology,
} from '../models/experience.model';

import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
  getTechnologies,
} from '../services/experience.service';



const initialForm: ExperienceFormData = {
  empresa: '',
  cargo: '',

  areaProfesional: '',
  especializacion: '',

  fechaInicio: '',
  fechaFin: '',
  esTrabajoActual: false,

  modalidadTrabajo: '',
  ubicacion: '',
  tipoContrato: '',

  tecnologiasIds: [],
  tecnologiasHerramientas: [],

  descripcion: '',

  evidenciaLaboralPdfUrl: '',
  proyectoRelacionadoUrl: '',
};

export const useExperience = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [formData, setFormData] = useState<ExperienceFormData>(initialForm);
  const [errors, setErrors] = useState<ExperienceErrors>({});
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<ExperienceMessage | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const loadExperiences = async () => {
  try {
      setLoading(true);
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar las experiencias laborales.',
      });
    } finally {
      setLoading(false);
    }
  };

const loadTechnologies = async () => {
  try {
    const data = await getTechnologies();
    setTechnologies(data);
  } catch {
    setTechnologies([]);
  }
};

useEffect(() => {
  void loadExperiences();
  void loadTechnologies();
}, []);
  

  const handleChange = (
    field: keyof ExperienceFormData,
    value: string | boolean | string[] | number[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'esTrabajoActual' && value === true ? { fechaFin: '' } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const startEditing = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
  empresa: experience.empresa,
  cargo: experience.cargo,

  areaProfesional: experience.areaProfesional,
  especializacion: experience.especializacion,

  fechaInicio: experience.fechaInicio
    ? experience.fechaInicio.slice(0, 7)
    : '',

  fechaFin: experience.fechaFin
    ? experience.fechaFin.slice(0, 7)
    : '',

  esTrabajoActual: experience.esTrabajoActual,

  modalidadTrabajo: experience.modalidadTrabajo,
  ubicacion: experience.ubicacion,
  tipoContrato: experience.tipoContrato,

  tecnologiasIds:
  experience.tecnologiasIds || [],

tecnologiasHerramientas:
  experience.tecnologiasHerramientas || [],

  descripcion: experience.descripcion,

  evidenciaLaboralPdfUrl:
    experience.evidenciaLaboralPdfUrl || '',

  proyectoRelacionadoUrl:
    experience.proyectoRelacionadoUrl || '',
});
    setErrors({});
    setMessage(null);
  };

  const removeExperience = async (id: number) => {
    try {
      await deleteExperience(id);
      await loadExperiences();
      setMessage(null);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'No se pudo eliminar la experiencia laboral.',
      });
    }
  };

  const validateForm = (): boolean => {
  const newErrors: ExperienceErrors = {};

  const onlyNumbersRegex = /^\d+$/;
  const currentMonth = new Date().toISOString().slice(0, 7);

  if (!formData.empresa.trim()) {
    newErrors.empresa = 'La empresa es obligatoria.';
  } else if (onlyNumbersRegex.test(formData.empresa.trim())) {
    newErrors.empresa = 'La empresa no puede contener solo números.';
  }

  if (!formData.cargo.trim()) {
    newErrors.cargo = 'El cargo es obligatorio.';
  } else if (onlyNumbersRegex.test(formData.cargo.trim())) {
    newErrors.cargo = 'El cargo no puede contener solo números.';
  }
  if (!formData.areaProfesional.trim()) {
  newErrors.areaProfesional =
    'El área profesional es obligatoria.';
}

if (!formData.especializacion.trim()) {
  newErrors.especializacion =
    'La especialización es obligatoria.';
}

if (!formData.modalidadTrabajo.trim()) {
  newErrors.modalidadTrabajo =
    'La modalidad de trabajo es obligatoria.';
}

if (!formData.ubicacion.trim()) {
  newErrors.ubicacion =
    'La ubicación es obligatoria.';
}

if (!formData.tipoContrato.trim()) {
  newErrors.tipoContrato =
    'El tipo de contrato es obligatorio.';
}

if (
  formData.tecnologiasIds.length === 0
) {
  newErrors.tecnologiasIds =
    'Debes agregar al menos una tecnología.';
}

  if (!formData.fechaInicio.trim()) {
    newErrors.fechaInicio = 'La fecha de inicio es obligatoria.';
  } else if (formData.fechaInicio > currentMonth) {
    newErrors.fechaInicio = 'La fecha de inicio no puede ser mayor a la fecha actual.';
  }

  if (!formData.esTrabajoActual && !formData.fechaFin.trim()) {
    newErrors.fechaFin = 'La fecha de fin es obligatoria.';
  }

  if (
    formData.fechaFin &&
    !formData.esTrabajoActual &&
    formData.fechaFin > currentMonth
  ) {
    newErrors.fechaFin = 'La fecha de fin no puede ser mayor a la fecha actual.';
  }

  if (
    formData.fechaInicio &&
    formData.fechaFin &&
    !formData.esTrabajoActual &&
    formData.fechaInicio > formData.fechaFin
  ) {
    newErrors.fechaFin = 'La fecha de fin no puede ser menor que la fecha de inicio.';
  }

  if (!formData.descripcion.trim()) {
    newErrors.descripcion = 'La descripción es obligatoria.';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const submitExperience = async (): Promise<boolean> => {
    const isValid = validateForm();

    if (!isValid) {
      setMessage(null);
      return false;
    }

    try {
      setSaving(true);

      if (editingExperience) {
        await updateExperience(editingExperience.id, formData);
      } else {
        await createExperience(formData);
      }

      await loadExperiences();
      setFormData(initialForm);
      setErrors({});
      setEditingExperience(null);
      setMessage(null);

      return true;
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'No se pudo guardar la experiencia laboral.',
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditingExperience(null);
    setFormData(initialForm);
    setErrors({});
    setMessage(null);
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return {
    formData,
    errors,
    experiences,
    loading,
    saving,
    message,
    editingExperience,
    handleChange,
    submitExperience,
    closeMessage,
    loadExperiences,
    startEditing,
    removeExperience,
    cancelEditing,
    technologies,
  };
};