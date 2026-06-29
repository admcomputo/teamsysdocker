import type { PerfilPhotoData, PhotoProfileResponse } from '../models/photo.model';
import type { UpdatePhotoRequestDto } from '../services/photo.dto';

export const photoService = {
  getProfilePhoto: async (): Promise<PerfilPhotoData> => {
    const token = sessionStorage.getItem('jwt');

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/perfil`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'No se pudo obtener la foto de perfil');
    }

    return await response.json();
  },

  uploadToCloudinary: async (file: File): Promise<string> => {
    const CLOUD_NAME = 'ddzmot3te';
    const UPLOAD_PRESET = 'profile_photos_unsigned';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.secure_url) {
      throw new Error(data?.error?.message || 'Error al subir la imagen a Cloudinary');
    }

    return data.secure_url as string;
  },

  updateProfilePhoto: async (
    dto: UpdatePhotoRequestDto
  ): Promise<PhotoProfileResponse> => {
    const token = sessionStorage.getItem('jwt');

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/foto-perfil`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al actualizar la foto de perfil');
    }

    return await response.json();
  },
};