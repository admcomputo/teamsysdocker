import type {
  Disponibilidad,
  ModalidadTrabajo,
  OrdenarPor,
  //ExperienciaLaboral,
  //HabilidadTecnica,
  //HabilidadBlanda,
  //Proyecto,
  //FormacionAcademica,
} from "../models/filtros-busqueda.model";

// --- Sub-DTOs Avanzados con propiedades que admiten null ---
export interface ExperienciaLaboralDTO {
  nombreEmpresa: string | null;
  cargo: string | null;
  anosExperiencia: number | null;
  ciudad: string | null;
  tecnologias: string[] | null;
}

export interface HabilidadTecnicaDTO {
  nombre: string | null;
  nivel: string | null; // Aceptará null si es "TODOS"
  anosExperiencia: number | null;
}

export interface HabilidadBlandaDTO {
  nombre: string | null;
}

export interface ProyectoDTO {
  nombre: string | null;
  tecnologias: string[] | null;
  duracion: string | null;
  rol: string | null;
}

export interface FormacionAcademicaDTO {
  institucion: string | null;
  titulo: string | null;
  nivel: string | null;  // Aceptará null si es "TODOS"
  duracion: number | null;
  estado: string | null; // Aceptará null si es "TODOS"
}

export interface BuscarPortafoliosRequestDTO {
  buscar?: string | null;
  profesion?: string | null;
  especializacion?: string | null;
  tecnologia?: string | null;
  empresa?: string | null;
  disponibilidad?: Disponibilidad | null;
  modalidadTrabajo?: "REMOTO" | "PRESENCIAL" | "HIBRIDO" | null;
  experienciaMinima?: number | null;
  idiomas?: string[] | null;
  ubicacion?: string | null;
  ordenarPor?: OrdenarPor;
  pagina: number;
  limite: number;
  
  // Usamos los nuevos sub-DTOs flexibles aquí 🎯
  experienciaLaboral?: ExperienciaLaboralDTO | null;
  habilidadTecnica?: HabilidadTecnicaDTO | null;
  habilidadBlanda?: HabilidadBlandaDTO | null;
  proyecto?: ProyectoDTO | null;
  formacionAcademica?: FormacionAcademicaDTO | null;
}

export interface PortafolioResultadoResponseDTO {
  id: number;
  nombreCompleto: string;
  profesion: string;
  especializacion?: string | null;
  ubicacion?: string | null;
  disponibilidad?: Disponibilidad | null;
  modalidadTrabajo?: ModalidadTrabajo | null;
  tecnologias?: string[] | null;
  idiomas?: string[] | null;
  experienciaAnios?: number | null;
  cantidadProyectos?: number | null;
  empresas?: string[] | null;
  fotoPerfilUrl?: string | null;
  urlPublica: string;
  resumen?: string | null;
}

export interface BuscarPortafoliosResponseDTO {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  data: PortafolioResultadoResponseDTO[];
}