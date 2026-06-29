import { apiClient } from '@/core/api/api-client';
import type {
  BackendCV,
  BackendResponse,
  SaveCVRequest,
} from '../models/cv.model';

const API_BASE = '/api/cvs';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddzmot3te';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'cv_files_unsigned';
const CLOUDINARY_UPLOAD_FOLDER = import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER || 'cvs';

export const uploadPdfToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('resource_type', 'raw');
  formData.append('folder', CLOUDINARY_UPLOAD_FOLDER);
  formData.append('public_id', `cvs/${Date.now()}_${file.name.replace(/\.pdf$/i, '')}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: 'POST', body: formData }
  );
  /*
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.secure_url) {
    throw new Error(data?.error?.message || 'Error al subir el archivo PDF a Cloudinary');
  }
  return data.secure_url as string;*/
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Error al subir a Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
};

export const cvManagementService = {
  async getCVs(): Promise<BackendCV[]> {
    return await apiClient.get<BackendCV[]>(`${API_BASE}/mis-cvs`);
  },

  async registerCV(payload: SaveCVRequest): Promise<BackendCV> {
    const response = await apiClient.post<BackendResponse<BackendCV>>(
      `${API_BASE}/registrar`,
      payload
    );

    return response.data;
  },

  async updateCV(idCurriculum: number, payload: SaveCVRequest): Promise<BackendCV> {
    const response = await apiClient.put<BackendResponse<BackendCV>>(
      `${API_BASE}/actualizar/${idCurriculum}`,
      payload
    );

    return response.data;
  },

  async deleteCV(idCurriculum: number): Promise<void> {
    await apiClient.delete(`${API_BASE}/eliminar/${idCurriculum}`);
  },

  async uploadPdfToCloudinary(file: File): Promise<string> {
    return uploadPdfToCloudinary(file);
  },

  async getPortfolioSummary() {
    return await apiClient.get('/api/portafolio/mi-resumen');
  },
};