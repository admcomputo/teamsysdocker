export interface TechnologyDto {
  id: number;
  nombre: string;
  categoria: string;
  logoUrl: string | null;
}

export interface TechnologiesResponseDto {
  data: TechnologyDto[];
}

export interface ExperienceDto {
  id: number;
  nombreEmpresa: string;
  cargoPuesto: string;

  areaProfesional: string;
  especializacion: string;

  fechaInicio: string;
  fechaFin: string | null;
  actualmenteTrabajoAqui: boolean;

  modalidadTrabajo: string;
  ubicacion: string;
  tipoContrato: string;

  descripcionProyecto: string;

  evidenciaLaboralPdfUrl: string | null;
  proyectoRelacionadoUrl: string | null;

  tecnologiasIds?: number[];
  nombresTecnologias: string[];
}

export interface CreateExperienceDto {
  nombreEmpresa: string;
  cargoPuesto: string;

  areaProfesional: string;
  especializacion: string;

  fechaInicio: string;
  fechaFin: string | null;
  actualmenteTrabajoAqui: boolean;

  modalidadTrabajo: string;
  ubicacion: string;
  tipoContrato: string;

  tecnologiasIds: number[];

  descripcionProyecto: string;

  evidenciaLaboralPdfUrl: string | null;
  proyectoRelacionadoUrl: string | null;
}

export interface CreateExperienceResponseDto {
  message: string;
  data: ExperienceDto;
}

export interface UpdateExperienceDto extends CreateExperienceDto {
  id: number;
}