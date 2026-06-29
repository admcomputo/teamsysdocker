export type OrdenarPor =
  | "relevancia"
  | "experiencia"
  | "proyectos"
  | "recientes";

export type Disponibilidad = "Disponible" | "No disponible" | "";

export type ModalidadTrabajo =
  | "Remoto"
  | "Presencial"
  | "Híbrida"
  | "Freelance"
  | "";

export type NivelAcademico = "TODOS"|"PRIMARIA" | "SECUNDARIA" | "TECNICO" | "LICENCIATURA" | "MAESTRIA" | "DOCTORADO" | "DIPLOMADO" | "CURSOS";
export type EstadoFormacion = "TODOS"|"EN CURSO" | "FINALIZADO" | "INCOMPLETO";
export type NivelDominio = "TODOS"|"BASICO" | "INTERMEDIO" | "AVANZADO" | "EXPERTO";

// --- Nuevas interfaces para filtros avanzados ---
export interface ExperienciaLaboral {
  nombreEmpresa: string;
  cargo: string;
  anosExperiencia: number;
  ciudad: string;
  tecnologias: string[];
}

export interface HabilidadTecnica {
  nombre: string;
  nivel: NivelDominio;
  anosExperiencia: number;
}

export interface HabilidadBlanda {
  nombre: string;
}

export interface Proyecto {
  nombre: string;
  tecnologias: string[];
  duracion: string;
  rol: string;
}

export interface FormacionAcademica {
  institucion: string;
  titulo: string;
  nivel: NivelAcademico;
  duracion: number;
  estado: EstadoFormacion;
}
export interface FiltrosBusqueda {
  buscar: string;
  profesion: string;
  especializacion: string;
  tecnologia: string;
  empresa: string;
  //formacionAcademica: string;
  disponibilidad: Disponibilidad;
  modalidadTrabajo: ModalidadTrabajo;
  experienciaMinima: number | "";
  idiomas: string[];
  ubicacion: string;
  ordenarPor: OrdenarPor;
  pagina: number;
  limite: number;

  // Filtros avanzados (opcionales, pueden ser null)
  //experienciasLaborales: ExperienciaLaboral[] | null;
  //habilidadesTecnicas: HabilidadTecnica[] | null;
  //habilidadesBlandas: HabilidadBlanda[] | null;
  //proyectos: Proyecto[] | null;
  //formacionAcademica: FormacionAcademica[] | null;

  experienciaLaboral: ExperienciaLaboral | null;
  habilidadTecnica: HabilidadTecnica | null;
  habilidadBlanda: HabilidadBlanda | null;
  proyecto: Proyecto | null;
  formacionAcademica: FormacionAcademica | null;

}

export interface PortafolioResultado {
  id: number;
  nombreCompleto: string;
  profesion: string;
  especializacion?: string;
  ubicacion: string;
  disponibilidad: Disponibilidad;
  modalidadTrabajo?: ModalidadTrabajo;
  tecnologias: string[];
  idiomas: string[];
  experienciaAnios: number;
  cantidadProyectos: number;
  empresas?: string[];
  fotoPerfilUrl?: string;
  urlPublica: string;
  resumen?: string;
}

export interface RespuestaBusquedaPortafolios {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  data: PortafolioResultado[];
}

export const filtrosBusquedaIniciales: FiltrosBusqueda = {
  buscar: '',
  profesion: '',
  especializacion: '',
  tecnologia: '',
  empresa: '',
  //formacionAcademica: "",
  disponibilidad: '',
  modalidadTrabajo: '',
  experienciaMinima: '',
  idiomas: [],
  ubicacion: '',
  ordenarPor: "experiencia",
  pagina: 1,
  limite: 10,
  // Avanzados vacíos
  //experienciasLaborales: null,
  //habilidadesTecnicas: null,
  //habilidadesBlandas: null,
  //proyectos: null,
  //formacionAcademica: null,
  experienciaLaboral: null,
  habilidadTecnica: null,
  habilidadBlanda: null,
  proyecto: null,
  formacionAcademica: null,
};

export const opcionesDisponibilidad: Disponibilidad[] = [
  "",
  "Disponible",
  "No disponible",
];

export const opcionesModalidadTrabajo: ModalidadTrabajo[] = [
  "",
  "Remoto",
  "Presencial",
  "Híbrida",
  "Freelance",
];

export const opcionesOrdenarPor: { label: string; value: OrdenarPor }[] = [
  { label: "Más relevantes", value: "relevancia" },
  { label: "Más experiencia", value: "experiencia" },
  { label: "Más proyectos", value: "proyectos" },
  { label: "Más recientes", value: "recientes" },
];

export const opcionesIdiomas = [
  "Español",
  "Inglés",
  "Portugués",
  "Francés",
  "Alemán",
  "Italiano",
];

export const validarTextoGeneral = (valor: string): string => {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,-]/g, "");
};

export const validarSoloLetras = (valor: string): string => {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
};

export const validarTecnologia = (valor: string): string => {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#/+_-]/g, "");
};

export const validarUbicacion = (valor: string): string => {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.-]/g, "");
};

export const validarEmpresa = (valor: string): string => {
  return valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,&/-]/g, "");
};

export const validarExperienciaMinima = (valor: string): number | "" => {
  const soloNumeros = valor.replace(/[^0-9]/g, "");

  if (soloNumeros === "") {
    return "";
  }

  const numero = Number(soloNumeros);

  if (numero < 0) {
    return "";
  }

  if (numero > 50) {
    return 50;
  }

  return numero;
};