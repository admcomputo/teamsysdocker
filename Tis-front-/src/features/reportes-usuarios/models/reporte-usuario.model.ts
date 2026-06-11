export type EstadoUsuario = 'ACTIVO' | 'INACTIVO';

export interface ReporteUsuario {
  id: number;
  nombreCompleto: string;
  correo: string;
  profesion: string;
  fechaRegistro: string;
  estado: EstadoUsuario;
}

export interface FiltrosReporteUsuario {
  fechaInicio: string;
  fechaFin: string;
  estado: '' | EstadoUsuario;
  profesion: string;
  busqueda: string;
}

export interface ReporteUsuariosResponse {
  totalUsuarios: number;
  usuariosActivos: number;
  usuariosInactivos: number;
  usuarios: ReporteUsuario[];
}