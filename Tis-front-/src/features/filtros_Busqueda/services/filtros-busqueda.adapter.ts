import type {
  FiltrosBusqueda,
  PortafolioResultado,
  RespuestaBusquedaPortafolios,
} from "../models/filtros-busqueda.model";

import type {
  BuscarPortafoliosRequestDTO,
  BuscarPortafoliosResponseDTO,
  PortafolioResultadoResponseDTO,
  ExperienciaLaboralDTO,
  HabilidadTecnicaDTO,
  HabilidadBlandaDTO,
  ProyectoDTO,
  FormacionAcademicaDTO,
} from "./filtros-busqueda.dto";
// Helpers internos para limpiar datos hacia el DTO
const limpiarTexto = (valor: string): string | null => {
  const limpio = valor?.trim();
  return limpio && limpio.length > 0 ? limpio : null;
};

const limpiarSelectorDefault = (valor: string): string | null => {
  return valor === "TODOS" || valor === "" ? null : valor;
};

export const filtrosBusquedaToRequestDTO = (filtros: FiltrosBusqueda): BuscarPortafoliosRequestDTO => {
  
  // 1. Limpieza de Experiencia Laboral
  let experienciaLaboralClean: ExperienciaLaboralDTO | null = null;
  if (filtros.experienciaLaboral && filtros.experienciaLaboral.nombreEmpresa.trim()) {
    experienciaLaboralClean = {
      nombreEmpresa: limpiarTexto(filtros.experienciaLaboral.nombreEmpresa),
      cargo: limpiarTexto(filtros.experienciaLaboral.cargo),
      anosExperiencia: filtros.experienciaLaboral.anosExperiencia > 0 ? filtros.experienciaLaboral.anosExperiencia : null,
      ciudad: limpiarTexto(filtros.experienciaLaboral.ciudad),
      tecnologias: filtros.experienciaLaboral.tecnologias?.length ? filtros.experienciaLaboral.tecnologias : null,
    };
  }

  // 2. Limpieza de Habilidad Técnica
  let habilidadTecnicaClean: HabilidadTecnicaDTO | null = null;
  if (filtros.habilidadTecnica && filtros.habilidadTecnica.nombre.trim()) {
    habilidadTecnicaClean = {
      nombre: limpiarTexto(filtros.habilidadTecnica.nombre),
      nivel: limpiarSelectorDefault(filtros.habilidadTecnica.nivel),
      anosExperiencia: filtros.habilidadTecnica.anosExperiencia > 0 ? filtros.habilidadTecnica.anosExperiencia : null,
    };
  }

  // 3. Limpieza de Habilidad Blanda
  let habilidadBlandaClean: HabilidadBlandaDTO | null = null;
  if (filtros.habilidadBlanda && filtros.habilidadBlanda.nombre.trim()) {
    habilidadBlandaClean = {
      nombre: limpiarTexto(filtros.habilidadBlanda.nombre),
    };
  }

  // 4. Limpieza de Proyecto
  let proyectoClean: ProyectoDTO | null = null;
  if (filtros.proyecto && filtros.proyecto.nombre.trim()) {
    proyectoClean = {
      nombre: limpiarTexto(filtros.proyecto.nombre),
      tecnologias: filtros.proyecto.tecnologias?.length ? filtros.proyecto.tecnologias : null,
      duracion: limpiarTexto(filtros.proyecto.duracion),
      rol: limpiarTexto(filtros.proyecto.rol),
    };
  }

  // 5. Limpieza de Formación Académica
  let formacionAcademicaClean: FormacionAcademicaDTO | null = null;
  if (filtros.formacionAcademica && filtros.formacionAcademica.institucion.trim()) {
    formacionAcademicaClean = {
      institucion: limpiarTexto(filtros.formacionAcademica.institucion),
      titulo: limpiarTexto(filtros.formacionAcademica.titulo),
      nivel: limpiarSelectorDefault(filtros.formacionAcademica.nivel),
      duracion: filtros.formacionAcademica.duracion > 0 ? filtros.formacionAcademica.duracion : null,
      estado: limpiarSelectorDefault(filtros.formacionAcademica.estado),
    };
  }

  return {
    buscar: limpiarTexto(filtros.buscar),
    profesion: null,
    especializacion: null,
    tecnologia: null,
    empresa: null,
    disponibilidad: null,
    modalidadTrabajo: null,
    experienciaMinima: null,
    idiomas: null,
    ubicacion: null,

    // Enviamos las estructuras perfectamente sanitizadas sin romper tipados de la UI 🚀
    experienciaLaboral: experienciaLaboralClean,
    habilidadTecnica: habilidadTecnicaClean,
    habilidadBlanda: habilidadBlandaClean,
    proyecto: proyectoClean,
    formacionAcademica: formacionAcademicaClean,

    ordenarPor: filtros.ordenarPor,
    pagina: filtros.pagina,
    limite: filtros.limite,
  };
};

const portafolioResponseToModel = (
  item: PortafolioResultadoResponseDTO,
): PortafolioResultado => {
  return {
    id: item.id,
    nombreCompleto: item.nombreCompleto,
    profesion: item.profesion,
    especializacion: item.especializacion ?? "",
    ubicacion: item.ubicacion ?? "Sin ubicación",
    disponibilidad: item.disponibilidad ?? "",
    modalidadTrabajo: item.modalidadTrabajo ?? "",
    tecnologias: item.tecnologias ?? [],
    idiomas: item.idiomas ?? [],
    experienciaAnios: item.experienciaAnios ?? 0,
    cantidadProyectos: item.cantidadProyectos ?? 0,
    empresas: item.empresas ?? [],
    fotoPerfilUrl: item.fotoPerfilUrl ?? undefined,
    urlPublica: item.urlPublica,
    resumen: item.resumen ?? "",
  };
};

export const buscarPortafoliosResponseToModel = (
  response: BuscarPortafoliosResponseDTO,
): RespuestaBusquedaPortafolios => {
  return {
    total: response.total,
    pagina: response.pagina,
    limite: response.limite,
    totalPaginas: response.totalPaginas,
    data: response.data.map(portafolioResponseToModel),
  };
};