export type ProjectStatus = "FINALIZADO" | "EN_DESARROLLO" | "PAUSADO";

export type ProjectPrivacy = "PUBLICO" | "PRIVADO";

export interface Technology {
  id: number;
  nombre: string;
  categoria: string;
  logoUrl: string | null;
}

export interface ProjectImage {
  url: string;
  descripcion?: string;
  file?: File;
}

export interface ProjectPdf {
  url: string;
  nombre: string;
  file?: File;
}

export interface ProjectFormModel {
  nombreProyecto: string;
  rolProyecto: string;
  descripcionProyecto: string;

  tecnologiasIds: number[];
  tecnologiasHerramientas: string[];
  nuevasTecnologias: string[];

  urlRepositorio: string;
  urlDemo: string;
  urlsAdicionales: string[];

  imagenes: ProjectImage[];
  pdfs: ProjectPdf[];

  fechaInicio: string;
  fechaFinalizacion: string;
  estadoProyecto: ProjectStatus;
  privacidad: ProjectPrivacy;
}
