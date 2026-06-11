export interface TechnologyDTO {
  id: number;
  nombre: string;
  categoria: string;
  logoUrl: string | null;
}

export interface TechnologiesResponseDTO {
  data: TechnologyDTO[];
}

export interface CreateProjectDTO {
  titulo: string;
  descripcion: string;
  tecnologiaIds: number[];
  nuevasTecnologias: string[];

  enlaceGithub?: string;
  enlaceDemo?: string;

  urlsImagenes: string[];
  urlPdfs: string[];

  esPublico: boolean;
  destacar: boolean;

  rolProyecto?: string;
  urlsAdicionales?: string[];
  fechaInicio?: string;
  fechaFinalizacion?: string;
  estadoProyecto?: string;
}

export type UpdateProjectDTO = CreateProjectDTO;

export interface ProjectResponseDTO {
  idProyecto: number;
  titulo: string;
  descripcion: string;

  tecnologiaIds: number[];
  nombresTecnologias?: string[];
  nuevasTecnologias?: string[];

  enlaceGithub?: string;
  enlaceDemo?: string;
  urlsImagenes?: string[];
  urlPdfs?: string[];

  esPublico: boolean;
  destacar: boolean;
  idUsuario?: number;

  rolProyecto?: string;
  urlsAdicionales?: string[];
  fechaInicio?: string;
  fechaFinalizacion?: string;
  estadoProyecto?: string;
}