import type {
  UsuarioLikeDTO,
  TotalLikesDTO,
  LikeResponseDTO,
} from './likes.dto';

const API_URL = 'https://teamsysback.apps.cs.umss.edu.bo/api/enlace';


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

const getErrorMessage = async (
  response: Response
): Promise<string> => {
  const text = await response.text();

  try {
    const data = JSON.parse(text);
    return data.message || data.msg || text;
  } catch {
    return text || 'Error en la petición';
  }
};

export const likesService = {
  getTotalLikes: async (): Promise<number> => {
    const response = await fetch(
      `${API_URL}/mis-likes/total`,
      {
        method: 'GET',
        headers: authHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const data: TotalLikesDTO =
      await response.json();

    return data.totalLikes;
  },

  getLikesHistory: async (): Promise<UsuarioLikeDTO[]> => {
    const response = await fetch(
      `${API_URL}/mis-likes`,
      {
        method: 'GET',
        headers: authHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return response.json();
  },

  like: async (
    textoUrl: string
  ): Promise<LikeResponseDTO> => {
    const response = await fetch(
      `${API_URL}/profile/${textoUrl}/like`,
      {
        method: 'POST',
        headers: authHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return response.json();
  },

  unlike: async (
    textoUrl: string
  ): Promise<LikeResponseDTO> => {
    const response = await fetch(
      `${API_URL}/profile/${textoUrl}/like`,
      {
        method: 'DELETE',
        headers: authHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return response.json();
  },
};