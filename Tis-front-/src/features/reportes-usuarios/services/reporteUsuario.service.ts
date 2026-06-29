  import axios from 'axios';
  import type {
    FiltrosReporteUsuario,
    ReporteUsuariosResponse,
  } from '../models/reporte-usuario.model';

  const API_URL = import.meta.env.VITE_API_URL;

  /**
   * Cambia esto a false cuando el backend ya esté listo.
   */
  const USAR_MOCK = false;

  const reporteUsuariosMock: ReporteUsuariosResponse = {
    totalUsuarios: 7,
    usuariosActivos: 5,
    usuariosInactivos: 2,
    usuarios: [
      {
        id: 1,
        nombreCompleto: 'Gabriel Rojas',
        correo: 'gabriel.rojas@gmail.com',
        profesion: 'Desarrollador de Software',
        fechaRegistro: '2026-05-28',
        estado: 'ACTIVO',
      },
      {
        id: 2,
        nombreCompleto: 'Daniela Castro',
        correo: 'daniela.castro@outlook.com',
        profesion: 'Ingeniera de Sistemas',
        fechaRegistro: '2026-05-26',
        estado: 'ACTIVO',
      },
      {
        id: 3,
        nombreCompleto: 'Javier Quispe',
        correo: 'javier.quispe@gmail.com',
        profesion: 'Desarrollador Frontend',
        fechaRegistro: '2026-05-24',
        estado: 'ACTIVO',
      },
      {
        id: 4,
        nombreCompleto: 'María Fernanda López',
        correo: 'maria.lopez@gmail.com',
        profesion: 'Analista de Datos',
        fechaRegistro: '2026-05-22',
        estado: 'INACTIVO',
      },
      {
        id: 5,
        nombreCompleto: 'Luis Fernando Morales',
        correo: 'luis.morales@gmail.com',
        profesion: 'Diseñador UX/UI',
        fechaRegistro: '2026-05-20',
        estado: 'ACTIVO',
      },
      {
        id: 6,
        nombreCompleto: 'Andrea Vega',
        correo: 'andrea.vega@gmail.com',
        profesion: 'Ingeniera de Calidad',
        fechaRegistro: '2026-05-18',
        estado: 'INACTIVO',
      },
      {
        id: 7,
        nombreCompleto: 'Rodrigo Salazar',
        correo: 'rodrigo.salazar@gmail.com',
        profesion: 'DevOps Engineer',
        fechaRegistro: '2026-05-15',
        estado: 'ACTIVO',
      },
    ],
  };

  const filtrarMock = (
    data: ReporteUsuariosResponse,
    filtros: FiltrosReporteUsuario
  ): ReporteUsuariosResponse => {
    const usuariosFiltrados = data.usuarios.filter((usuario) => {
      const coincideEstado = !filtros.estado || usuario.estado === filtros.estado;

      const coincideProfesion =
        !filtros.profesion ||
        usuario.profesion.toLowerCase().includes(filtros.profesion.toLowerCase());

      const busqueda = filtros.busqueda.toLowerCase();

      const coincideBusqueda =
        !busqueda ||
        usuario.nombreCompleto.toLowerCase().includes(busqueda) ||
        usuario.correo.toLowerCase().includes(busqueda);

      const fechaUsuario = new Date(`${usuario.fechaRegistro}T00:00:00`);

      const fechaInicio = filtros.fechaInicio
        ? new Date(`${filtros.fechaInicio}T00:00:00`)
        : null;

      const fechaFin = filtros.fechaFin
        ? new Date(`${filtros.fechaFin}T23:59:59`)
        : null;

      const coincideFechaInicio = !fechaInicio || fechaUsuario >= fechaInicio;
      const coincideFechaFin = !fechaFin || fechaUsuario <= fechaFin;

      return (
        coincideEstado &&
        coincideProfesion &&
        coincideBusqueda &&
        coincideFechaInicio &&
        coincideFechaFin
      );
    });

    return {
      totalUsuarios: data.totalUsuarios,
      usuariosActivos: data.usuariosActivos,
      usuariosInactivos: data.usuariosInactivos,
      usuarios: usuariosFiltrados,
    };
  };

  export const obtenerReporteUsuarios = async (
    filtros: FiltrosReporteUsuario
  ): Promise<ReporteUsuariosResponse> => {
    if (USAR_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(filtrarMock(reporteUsuariosMock, filtros));
        }, 400);
      });
    }

    const token = sessionStorage.getItem('jwt');

    const response = await axios.get<ReporteUsuariosResponse>(
      `${API_URL}/api/admin/reportes/usuarios`,
      {
        params: {
          fechaInicio: filtros.fechaInicio || undefined,
          fechaFin: filtros.fechaFin || undefined,
          estado: filtros.estado || undefined,
          profesion: filtros.profesion || undefined,
          busqueda: filtros.busqueda || undefined,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );

    return response.data;
  };