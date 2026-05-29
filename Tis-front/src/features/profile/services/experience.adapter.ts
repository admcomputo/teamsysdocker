import type {
  Experience,
  ExperienceFormData,
  Technology,
} from '../models/experience.model';

import type {
  CreateExperienceDto,
  ExperienceDto,
  TechnologyDto,
} from './experience.dto';

export const adaptTechnology = (dto: TechnologyDto): Technology => {
  return {
    id: dto.id,
    nombre: dto.nombre,
    categoria: dto.categoria,
    logoUrl: dto.logoUrl,
  };
};

export const adaptTechnologies = (dtos: TechnologyDto[]): Technology[] => {
  return dtos.map(adaptTechnology);
};

export const adaptExperience = (dto: ExperienceDto): Experience => {
  return {
    id: dto.id,
    empresa: dto.nombreEmpresa,
    cargo: dto.cargoPuesto,

    areaProfesional: dto.areaProfesional,
    especializacion: dto.especializacion,

    fechaInicio: dto.fechaInicio,
    fechaFin: dto.fechaFin,
    esTrabajoActual: dto.actualmenteTrabajoAqui,

    modalidadTrabajo: dto.modalidadTrabajo,
    ubicacion: dto.ubicacion,
    tipoContrato: dto.tipoContrato,

    tecnologiasIds: dto.tecnologiasIds ?? [],
tecnologiasHerramientas: dto.nombresTecnologias ?? [],

    descripcion: dto.descripcionProyecto,

    evidenciaLaboralPdfUrl: dto.evidenciaLaboralPdfUrl,
    proyectoRelacionadoUrl: dto.proyectoRelacionadoUrl,
  };
};

export const adaptExperiences = (dtos: ExperienceDto[]): Experience[] => {
  return dtos.map(adaptExperience);
};

const mapMonthToLocalDate = (value: string): string | null => {
  if (!value) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return `${value}-01`;
};

export const adaptExperienceToCreateDto = (
  formData: ExperienceFormData,
): CreateExperienceDto => {
  return {
    nombreEmpresa: formData.empresa,
    cargoPuesto: formData.cargo,

    areaProfesional: formData.areaProfesional,
    especializacion: formData.especializacion,

    fechaInicio: mapMonthToLocalDate(formData.fechaInicio)!,
    fechaFin: formData.esTrabajoActual
      ? null
      : mapMonthToLocalDate(formData.fechaFin),

    actualmenteTrabajoAqui: Boolean(formData.esTrabajoActual),

    modalidadTrabajo: formData.modalidadTrabajo,
    ubicacion: formData.ubicacion,
    tipoContrato: formData.tipoContrato,

    tecnologiasIds: formData.tecnologiasIds,

    descripcionProyecto: formData.descripcion,

    evidenciaLaboralPdfUrl: formData.evidenciaLaboralPdfUrl || null,
    proyectoRelacionadoUrl: formData.proyectoRelacionadoUrl || null,
  };
};