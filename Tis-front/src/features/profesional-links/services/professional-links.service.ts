import type {
  GetRedesSocialesResponse,
  SaveRedSocialResponse,
  RedSocialRequestDTO,
} from './professional-links.dto';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8081';

const getToken = (): string => {
  const token = sessionStorage.getItem('jwt');

  if (!token) {
    throw new Error('No se encontró el token de autenticación.');
  }

  return token;
};

const buildHeaders = (withJson = true): HeadersInit => {
  const token = getToken();

  if (withJson) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleJsonResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      (data as { message?: string }).message ||
        'Ocurrió un error en la petición.'
    );
  }

  return data as T;
};

export const professionalLinksService = {
  async getProfessionalLinks(): Promise<GetRedesSocialesResponse> {
    const response = await fetch(`${API_URL}/api/redes-sociales`, {
      method: 'GET',
      headers: buildHeaders(),
    });

    return handleJsonResponse<GetRedesSocialesResponse>(response);
  },

  async createProfessionalLinks(
    payload: RedSocialRequestDTO[]
  ): Promise<SaveRedSocialResponse> {
    const response = await fetch(`${API_URL}/api/redes-sociales/registrar`, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    return handleJsonResponse<SaveRedSocialResponse>(response);
  },

  async updateProfessionalLink(
    idRed: number,
    payload: RedSocialRequestDTO
  ): Promise<SaveRedSocialResponse> {
    const response = await fetch(`${API_URL}/api/redes-sociales/${idRed}`, {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    return handleJsonResponse<SaveRedSocialResponse>(response);
  },

  async deleteProfessionalLink(
    idRed: number
  ): Promise<SaveRedSocialResponse> {
    const response = await fetch(`${API_URL}/api/redes-sociales/${idRed}`, {
      method: 'DELETE',
      headers: buildHeaders(false),
    });

    return handleJsonResponse<SaveRedSocialResponse>(response);
  },
};