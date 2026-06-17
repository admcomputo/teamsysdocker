import type {
  PerfilBackendResponse,
  Profesion,
  ProfileResponse,
} from '../models/profile.model';
import type { ProfilePhotoRequestDto, ProfileRequestDto } from './profile.dto';

const API_URL = ' https://teamsysback.apps.cs.umss.edu.bo/api';

const getToken = (): string | null => {
  return (
    sessionStorage.getItem('jwt') ||
    sessionStorage.getItem('token') ||
    localStorage.getItem('jwt') ||
    localStorage.getItem('token')
  );
};

const authHeaders = (): HeadersInit => {
  const token = getToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const getErrorMessage = async (response: Response): Promise<string> => {
  const text = await response.text();

  try {
    const data = JSON.parse(text);
    return data.message || data.msg || text || 'Error en la petición';
  } catch {
    return text || 'Error en la petición';
  }
};

export const profileService = {
  getProfileLocal: (): ProfileRequestDto | null => {
    const profileJson = localStorage.getItem('profile');
    return profileJson ? JSON.parse(profileJson) : null;
  },

  getProfile: async (): Promise<PerfilBackendResponse> => {
    const response = await fetch(`${API_URL}/usuarios/perfil`, {
      method: 'GET',
      headers: authHeaders(),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return await response.json();
  },

  getProfesiones: async (): Promise<Profesion[]> => {
    const response = await fetch(`${API_URL}/profesiones`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return await response.json();
  },

  updateProfile: async (dto: ProfileRequestDto): Promise<ProfileResponse> => {
    const response = await fetch(`${API_URL}/usuarios/perfil`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const data = await response.json();

    localStorage.setItem('profile', JSON.stringify(dto));

    return data;
  },

  updateProfilePhoto: async (
    dto: ProfilePhotoRequestDto
  ): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/usuarios/foto-perfil`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return await response.json();
  },
};