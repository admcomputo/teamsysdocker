import type {
  Disponibilidad,
  ModalidadTrabajo,
  OrdenarPor,
} from "../models/filtros-busqueda.model";

export interface BuscarPortafoliosRequestDTO {
  buscar?: string | null;
  profesion?: string | null;
  especializacion?: string | null;
  tecnologia?: string | null;
  formacionAcademica?: string | null;
  disponibilidad?: Disponibilidad | null;
  modalidadTrabajo?: "REMOTO" | "PRESENCIAL" | "HIBRIDO" | null;
  experienciaMinima?: number | null;
  idiomas?: string[] | null;
  ubicacion?: string | null;
  ordenarPor?: OrdenarPor;
  pagina: number;
  limite: number;
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