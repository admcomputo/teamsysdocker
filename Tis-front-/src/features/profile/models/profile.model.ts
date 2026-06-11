export interface ProfileUser {
  fullName: string;
  profession: string;
  bio: string;
  telefono: string;
  direccion: string;
  fotoPerfil?: string;
  correo?: string;
   disponibilidad: string;
}

export interface PerfilBackendResponse {
  nombre: string;
  biografia: string | null;
  idProfesion: number | null;
  foto: string | null;
  telefono: string | null;
  direccion: string | null;
  correo: string;
  disponibilidad: string | null;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    profession: string;
    bio: string;
    telefono: string;
    direccion: string;
    disponibilidad: string;
  };
}

export interface Profesion {
  idProfesion: number;
  nombreProfesion: string;
}