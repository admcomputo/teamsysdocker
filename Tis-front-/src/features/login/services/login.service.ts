import { apiClient } from "@core/api/api-client";
import type { User } from "../models/user.model";
import type {
  SendPasswordResetEmailRequestDTO,
  SendPasswordResetEmailResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO
} from "./login.dto";

// Respuesta que viene del backend
interface UsuarioRespuestaDTO {
  token: string;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
    roles: string[];
    foto?: string;
  };
}

export const loginService = {
  async login(email: string, pass: string): Promise<User> {
    const loginRequest = {
      correo: email,
      password: pass
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || 'Credenciales inválidas');
    }

    const data = (await response.json()) as UsuarioRespuestaDTO;

    if (data.token) {
      sessionStorage.setItem('jwt', data.token);
    }

    return {
  id: data.usuario.id.toString(),
  email: data.usuario.correo,
  fullName: data.usuario.nombre,
  token: data.token,
  foto: data.usuario.foto,
  roles: data.usuario.roles ?? []
};
  },

  async sendPasswordResetEmail(correo: string): Promise<SendPasswordResetEmailResponseDTO> {
    const payload: SendPasswordResetEmailRequestDTO = { correo };
    const response = await apiClient.post<SendPasswordResetEmailResponseDTO>(
      '/password/email',
      payload
    );
    return response;
  },

  async resetPassword(token: string, password: string): Promise<ResetPasswordResponseDTO> {
    const payload: ResetPasswordRequestDTO = { password };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        //Authorization: `Bearer ${token}`
      }
    };
    const response = await apiClient.post<ResetPasswordResponseDTO>(
      '/password/reset-password',
      payload,
      config
    );
    return response;
  }
};