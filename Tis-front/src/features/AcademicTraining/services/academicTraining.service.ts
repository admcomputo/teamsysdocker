import type { AcademicTraining } from '../models/academicTraining.model';

const API_URL = 'https://teamsysback.apps.cs.umss.edu.bo/api';

export const academicTrainingService = {
  uploadToCloudinary: async (file: File): Promise<string> => {
    const CLOUD_NAME = 'dvhan21ur';
    const UPLOAD_PRESET = 'portafolio';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.secure_url) {
      throw new Error(data?.error?.message || 'Error al subir el archivo a Cloudinary');
    }

    return data.secure_url as string;
  },

  async addAcademicTraining(training: Omit<AcademicTraining, 'id'>): Promise<AcademicTraining> {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    const dto = {
      institucion: training.institution,
      tituloObtenido: training.degree,
      area: training.fieldOfStudy,
      nivel: training.level,
      fechaInicio: training.startDate,
      fechaFin: training.endDate ? training.endDate : null,
      estado: training.status,
      descripcion: training.description,
      urlImagen: training.certificateUrl || ''
    };

    const response = await fetch(`${API_URL}/formacion/registrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al guardar la formación académica');
    }

    const data = await response.json();

    return {
      ...training,
      id: data.data?.id?.toString(),
    };
  },

  async getAcademicTrainings(): Promise<AcademicTraining[]> {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    const response = await fetch(`${API_URL}/formacion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al obtener la formación académica');
    }

    const json = await response.json();
    const data = json.data || [];

    return data.map((item: any) => ({
      id: item.id?.toString(),
      institution: item.institucion,
      degree: item.tituloObtenido,
      fieldOfStudy: item.area,
      level: item.nivel,
      startDate: item.fechaInicio,
      endDate: item.fechaFin,
      status: item.estado,
      description: item.descripcion,
      certificateUrl: item.urlImagen
    }));
  },

  async updateAcademicTraining(id: string, training: Omit<AcademicTraining, 'id'>): Promise<AcademicTraining> {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    const dto = {
      institucion: training.institution,
      tituloObtenido: training.degree,
      area: training.fieldOfStudy,
      nivel: training.level,
      fechaInicio: training.startDate,
      fechaFin: training.endDate ? training.endDate : null,
      estado: training.status,
      descripcion: training.description,
      urlImagen: training.certificateUrl || ''
    };

    const response = await fetch(`${API_URL}/formacion/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dto)
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al actualizar la formación académica');
    }

    const data = await response.json();

    return {
      ...training,
      id: data.data?.id?.toString() || id,
    };
  },

  async deleteAcademicTraining(id: string): Promise<void> {
    const token = sessionStorage.getItem('jwt');
    if (!token) {
      throw new Error('No estás autenticado');
    }

    const response = await fetch(`${API_URL}/formacion/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Error al eliminar la formación académica');
    }
  }
};
