export interface ProfileRequestDto {
  fullName: string;
  profession: string;
  bio: string;
  telefono: string;
  direccion: string;
  disponibilidad: string;
}

export interface ProfilePhotoRequestDto {
  fotoPerfil: string;
}

export interface ProfileResponseDto {
  success: boolean;
  message: string;
  data?: ProfileRequestDto;
}