export interface UsuarioLikeDTO {
  nombre: string;
  foto: string;
  profesion: string;
  fechaLike: string;
}

export interface TotalLikesDTO {
  totalLikes: number;
}

export interface LikeResponseDTO {
  message: string;
}