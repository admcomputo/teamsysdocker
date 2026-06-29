import { apiClient } from "@/core/api/api-client";

const ENDPOINT = "/habilidades-tecnicas";

export type NivelDominio = "BASICO" | "INTERMEDIO" | "AVANZADO" | "EXPERTO";

export interface Categoria {
  id: number;
  nombre: string;
}

export interface HabilidadTecnica {
  id: number;
  nombre: string;
  categoria?: Categoria;
  nivelDominio: NivelDominio;
  anosExperiencia: number;
  descripcion?: string;
  certificadoUrl?: string;
}

export interface HabilidadTecnicaPayload {
  id?: number | null;
  nombre: string;
  idCategoria: number;
  nivelDominio: NivelDominio;
  anosExperiencia: number;
  descripcion?: string;
  certificadoUrl?: string;
}

export const getMisHabilidades = () => {
  return apiClient.get<HabilidadTecnica[]>(`${ENDPOINT}/mis-habilidades`);
};

export const crearHabilidad = (data: HabilidadTecnicaPayload) => {
  return apiClient.post<{ message: string; id: number }>(
    `${ENDPOINT}/registrar`,
    data
  );
};

export const actualizarHabilidad = (data: HabilidadTecnicaPayload) => {
  return apiClient.put<{ message: string }>(
    `${ENDPOINT}/actualizar`,
    data
  );
};

export const eliminarHabilidad = (id: number) => {
  return apiClient.delete<{ message: string }>(
    `${ENDPOINT}/eliminar/${id}`
  );
};