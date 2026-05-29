import { apiClient } from "@/core/api/api-client";

const ENDPOINT = "/habilidades-blandas";

export interface Categoria {
  id: number;
  nombre: string;
}

export interface HabilidadBlanda {
  id: number;
  nombre: string;
  categoria?: Categoria;
  descripcion?: string;
  evidenciaUrl?: string;
}

export interface HabilidadBlandaPayload {
  id?: number | null;
  nombre: string;
  idCategoria: number;
  descripcion?: string;
  evidenciaUrl?: string;
}

export const getMisHabilidadesBlandas = () => {
  return apiClient.get<HabilidadBlanda[]>(`${ENDPOINT}/mis-habilidades`);
};

export const crearHabilidadBlanda = (data: HabilidadBlandaPayload) => {
  return apiClient.post<{ message: string; id: number }>(
    `${ENDPOINT}/registrar`,
    data
  );
};

export const actualizarHabilidadBlanda = (data: HabilidadBlandaPayload) => {
  return apiClient.put<{ message: string }>(
    `${ENDPOINT}/actualizar`,
    data
  );
};

export const eliminarHabilidadBlanda = (id: number) => {
  return apiClient.delete<{ message: string }>(
    `${ENDPOINT}/eliminar/${id}`
  );
};