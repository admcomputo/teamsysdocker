import { useEffect, useState } from 'react';
import type {
  FiltrosReporteUsuario,
  ReporteUsuario,
} from '../models/reporte-usuario.model';
import { obtenerReporteUsuarios } from '../services/reporteUsuario.service';

const filtrosIniciales: FiltrosReporteUsuario = {
  fechaInicio: '',
  fechaFin: '',
  estado: '',
  profesion: '',
  busqueda: '',
};

export const useReportesUsuarios = () => {
  const [usuarios, setUsuarios] = useState<ReporteUsuario[]>([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [usuariosActivos, setUsuariosActivos] = useState(0);
  const [usuariosInactivos, setUsuariosInactivos] = useState(0);

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filtrosFormulario, setFiltrosFormulario] =
    useState<FiltrosReporteUsuario>(filtrosIniciales);

  const [filtrosAplicados, setFiltrosAplicados] =
    useState<FiltrosReporteUsuario>(filtrosIniciales);

  const cargarReporte = async (filtros: FiltrosReporteUsuario) => {
    try {
      setCargando(true);
      setError(null);

      const data = await obtenerReporteUsuarios(filtros);

      setUsuarios(data.usuarios);
      setTotalUsuarios(data.totalUsuarios);
      setUsuariosActivos(data.usuariosActivos);
      setUsuariosInactivos(data.usuariosInactivos);
    } catch (error) {
      console.error(error);
      setError('No se pudo cargar el reporte de usuarios.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReporte(filtrosAplicados);
  }, [filtrosAplicados]);

  const aplicarFiltros = () => {
    setFiltrosAplicados(filtrosFormulario);
  };

  const limpiarFiltros = () => {
    setFiltrosFormulario(filtrosIniciales);
    setFiltrosAplicados(filtrosIniciales);
  };

  return {
    filtrosFormulario,
    setFiltrosFormulario,
    usuarios,
    totalUsuarios,
    usuariosActivos,
    usuariosInactivos,
    cargando,
    error,
    aplicarFiltros,
    limpiarFiltros,
  };
};