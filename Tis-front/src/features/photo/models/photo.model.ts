export interface PerfilPhotoData {
  nombre: string;
  idprofession: string;
  biografia: string;
  foto: string | null;
}

export interface PhotoProfileResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    profession: string;
    bio: string;
    fotoPerfil?: string;
  };
}