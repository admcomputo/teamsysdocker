import type {
  FiltrosBusqueda,
  PortafolioResultado,
  RespuestaBusquedaPortafolios,
} from "../models/filtros-busqueda.model";

import type {
  BuscarPortafoliosRequestDTO,
  BuscarPortafoliosResponseDTO,
  PortafolioResultadoResponseDTO,
} from "./filtros-busqueda.dto";

const limpiarTexto = (valor: string): string | null => {
  const limpio = valor.trim();
  return limpio.length > 0 ? limpio : null;
};

export const filtrosBusquedaToRequestDTO = (
  filtros: FiltrosBusqueda,
): BuscarPortafoliosRequestDTO => {
  return {
    buscar: limpiarTexto(filtros.buscar),
    profesion: limpiarTexto(filtros.profesion),
    especializacion: limpiarTexto(filtros.especializacion),
    tecnologia: limpiarTexto(filtros.tecnologia),
    empresa: limpiarTexto(filtros.empresa),
    formacionAcademica: limpiarTexto(filtros.formacionAcademica),
    disponibilidad: filtros.disponibilidad || null,
    modalidadTrabajo: null,
    experienciaMinima: null,
    idiomas: filtros.idiomas.length > 0 ? filtros.idiomas : null,
    ubicacion: limpiarTexto(filtros.ubicacion),
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