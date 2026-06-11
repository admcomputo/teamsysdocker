export enum CVType {
  GENERATED = 'GENERADO',
  UPLOADED = 'SUBIDO',
}

export enum CVTemplate {
  MODERN = 'modern',
  CLASSIC = 'classic',
  MINIMAL = 'minimal',
  PROFESSIONAL = 'professional',
}

export interface CVTemplateModel {
  id: CVTemplate;
  name: string;
  description: string;
  thumbnail: string;
  previewUrl?: string;
}

export interface BackendCV {
  idCurriculum: number;
  titulo: string;
  urlPdf: string;
  fechaCreacion: string;
  tipo: 'SUBIDO' | 'GENERADO';
  esOficial: boolean;
}

export interface CVModel {
  id: string;
  idCurriculum: number;
  name: string;
  type: CVType;
  template?: CVTemplate;
  fileUrl: string;
  fileName: string;
  isOfficial: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaveCVRequest {
  titulo: string;
  tipo: 'SUBIDO' | 'GENERADO';
  esOficial: boolean;
  urlPdf: string;
}

export interface BackendResponse<T> {
  message: string;
  data: T;
}

export enum CVLoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}