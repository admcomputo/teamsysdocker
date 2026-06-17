import { apiClient } from '@/core/api/api-client';

export const dashMyPerfilService = {
  async getPortfolioSummary() {
    return await apiClient.get('/api/portafolio/mi-resumen');
  },

  async getVisibilitySettings() {
    return await apiClient.get<Record<string, boolean>>('/api/visibilidad/mis-ajustes');
  },

  async getVisibilityElements() {
    const response = await apiClient.get<Record<string, Array<{ id: number; nombre: string; esPublico: boolean }>>>('/api/visibilidad/mis-elementos');
    console.log('GET /api/visibilidad/mis-elementos response:', response);
  return response;
  },

  async saveVisibilitySettings(settings: Record<string, boolean>) {
    return await apiClient.post('/api/visibilidad/guardar-ajustes', settings);
  },

  async saveVisibilityElements(payload: Partial<Record<string, Array<{ id: number; esPublico: boolean }>>>) {
    return await apiClient.put('/api/visibilidad/guardar-elementos', payload);
  },
};

