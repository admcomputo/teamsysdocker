import {
  buscarPortafoliosResponseToModel,
  filtrosBusquedaToRequestDTO,
} from "./filtros-busqueda.adapter";

import type {
  FiltrosBusqueda,
  RespuestaBusquedaPortafolios,
} from "../models/filtros-busqueda.model";

import type { BuscarPortafoliosResponseDTO } from "./filtros-busqueda.dto";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const buscarPortafoliosBackend = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  const requestDTO = filtrosBusquedaToRequestDTO(filtros);

  const response = await fetch(`${API_URL}/api/portafolios/buscar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestDTO),
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los portafolios.");
  }

  const data: BuscarPortafoliosResponseDTO = await response.json();

  return buscarPortafoliosResponseToModel(data);
};

export const buscarPortafoliosService = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  return buscarPortafoliosBackend(filtros);
};