import {
  buscarPortafoliosResponseToModel,
  filtrosBusquedaToRequestDTO,
} from "./filtros-busqueda.adapter";

import type {
  FiltrosBusqueda,
  RespuestaBusquedaPortafolios,
} from "../models/filtros-busqueda.model";

import type { BuscarPortafoliosResponseDTO } from "./filtros-busqueda.dto";

const API_URL = import.meta.env.VITE_API_URL;

const buscarPortafoliosBackend = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  const requestDTO = filtrosBusquedaToRequestDTO(filtros);
  console.log("Request DTO:", requestDTO); 
  const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }
  const response = await fetch(`${API_URL}/api/portafolios/avanzada/buscar`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestDTO)
    });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los portafolios.");
  }

  const data: BuscarPortafoliosResponseDTO = await response.json();

  console.log(data)
  return buscarPortafoliosResponseToModel(data);
};

export const buscarPortafoliosService = async (
  filtros: FiltrosBusqueda,
): Promise<RespuestaBusquedaPortafolios> => {
  return buscarPortafoliosBackend(filtros);
};