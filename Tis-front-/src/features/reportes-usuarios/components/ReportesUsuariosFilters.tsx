import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  CalendarDays,
  FileDown,
  Filter,
  RotateCcw,
  Search,
} from 'lucide-react';
import type { FiltrosReporteUsuario } from '../models/reporte-usuario.model';

interface Props {
  filtros: FiltrosReporteUsuario;
  setFiltros: Dispatch<SetStateAction<FiltrosReporteUsuario>>;
  aplicarFiltros: () => void;
  limpiarFiltros: () => void;
  exportarPdf: () => void;
}

interface ErroresFiltros {
  fechaInicio?: string;
  fechaFin?: string;
  profesion?: string;
  busqueda?: string;
  general?: string;
}

const MAX_PROFESION = 30;
const MAX_BUSQUEDA = 40;

const obtenerFechaHoy = () => {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};

const normalizarTexto = (valor: string) => {
  return valor.trim().replace(/\s+/g, ' ');
};

const convertirFecha = (fecha: string) => {
  if (!fecha) return null;

  const fechaConvertida = new Date(`${fecha}T00:00:00`);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return null;
  }

  return fechaConvertida;
};

export const ReportesUsuariosFilters = ({
  filtros,
  setFiltros,
  aplicarFiltros,
  limpiarFiltros,
  exportarPdf,
}: Props) => {
  const [errores, setErrores] = useState<ErroresFiltros>({});
  const [resetKey, setResetKey] = useState(0);

  const fechaHoy = obtenerFechaHoy();

  const validarFiltros = (filtrosValidados: FiltrosReporteUsuario) => {
    const nuevosErrores: ErroresFiltros = {};

    const fechaActual = convertirFecha(fechaHoy);
    const fechaInicio = convertirFecha(filtrosValidados.fechaInicio);
    const fechaFin = convertirFecha(filtrosValidados.fechaFin);

    if (fechaInicio && fechaActual && fechaInicio > fechaActual) {
      nuevosErrores.fechaInicio =
        'La fecha inicio no puede ser posterior al día de hoy.';
    }

    if (fechaFin && fechaActual && fechaFin > fechaActual) {
      nuevosErrores.fechaFin =
        'La fecha fin no puede ser posterior al día de hoy.';
    }

    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      nuevosErrores.general =
        'La fecha inicio debe ser menor o igual a la fecha fin.';
    }

    if (filtrosValidados.profesion.length > MAX_PROFESION) {
      nuevosErrores.profesion = `La profesión no debe superar ${MAX_PROFESION} caracteres.`;
    }

    if (filtrosValidados.busqueda.length > MAX_BUSQUEDA) {
      nuevosErrores.busqueda = `La búsqueda no debe superar ${MAX_BUSQUEDA} caracteres.`;
    }

    return nuevosErrores;
  };

  const handleAplicarFiltros = () => {
    const filtrosNormalizados: FiltrosReporteUsuario = {
      ...filtros,
      profesion: normalizarTexto(filtros.profesion),
      busqueda: normalizarTexto(filtros.busqueda),
    };

    const nuevosErrores = validarFiltros(filtrosNormalizados);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setFiltros(filtrosNormalizados);
      return;
    }

    setErrores({});
    setFiltros(filtrosNormalizados);

    setTimeout(() => {
      aplicarFiltros();
    }, 0);
  };

  const handleLimpiarFiltros = () => {
    setErrores({});
    setResetKey((prev) => prev + 1);
    limpiarFiltros();
  };

  const handleCambiarProfesion = (valor: string) => {
    if (valor.length > MAX_PROFESION) {
      setErrores((prev) => ({
        ...prev,
        profesion: `La profesión no debe superar ${MAX_PROFESION} caracteres.`,
      }));
      return;
    }

    setErrores((prev) => ({
      ...prev,
      profesion: undefined,
      general: undefined,
    }));

    setFiltros((prev) => ({
      ...prev,
      profesion: valor,
    }));
  };

  const handleCambiarBusqueda = (valor: string) => {
    if (valor.length > MAX_BUSQUEDA) {
      setErrores((prev) => ({
        ...prev,
        busqueda: `La búsqueda no debe superar ${MAX_BUSQUEDA} caracteres.`,
      }));
      return;
    }

    setErrores((prev) => ({
      ...prev,
      busqueda: undefined,
      general: undefined,
    }));

    setFiltros((prev) => ({
      ...prev,
      busqueda: valor,
    }));
  };

  return (
    <div className="rounded-2xl border border-blue-900/70 bg-[#071426] p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-3">
        <Filter className="text-blue-400" size={22} />
        <h2 className="text-xl font-bold text-white">Filtros de búsqueda</h2>
      </div>

      {errores.general && (
        <div className="mb-5 rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
          {errores.general}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Fecha inicio
          </label>

          <div className="relative">
            <input
              key={`fechaInicio-${resetKey}`}
              type="date"
              max={fechaHoy}
              value={filtros.fechaInicio}
              onChange={(event) => {
                setErrores((prev) => ({
                  ...prev,
                  fechaInicio: undefined,
                  general: undefined,
                }));

                setFiltros((prev) => ({
                  ...prev,
                  fechaInicio: event.target.value,
                }));
              }}
              className={`w-full rounded-lg border bg-[#020817] px-4 py-3 pr-11 text-slate-200 outline-none transition [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 ${
                errores.fechaInicio
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-blue-900 focus:border-emerald-400'
              }`}
            />

            <CalendarDays
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white"
            />
          </div>

          {errores.fechaInicio && (
            <p className="mt-2 text-xs font-medium text-red-300">
              {errores.fechaInicio}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Fecha fin
          </label>

          <div className="relative">
            <input
              key={`fechaFin-${resetKey}`}
              type="date"
              max={fechaHoy}
              value={filtros.fechaFin}
              onChange={(event) => {
                setErrores((prev) => ({
                  ...prev,
                  fechaFin: undefined,
                  general: undefined,
                }));

                setFiltros((prev) => ({
                  ...prev,
                  fechaFin: event.target.value,
                }));
              }}
              className={`w-full rounded-lg border bg-[#020817] px-4 py-3 pr-11 text-slate-200 outline-none transition [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 ${
                errores.fechaFin
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-blue-900 focus:border-emerald-400'
              }`}
            />

            <CalendarDays
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white"
            />
          </div>

          {errores.fechaFin && (
            <p className="mt-2 text-xs font-medium text-red-300">
              {errores.fechaFin}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Estado
          </label>

          <select
            value={filtros.estado}
            onChange={(event) =>
              setFiltros((prev) => ({
                ...prev,
                estado: event.target.value as '' | 'ACTIVO' | 'INACTIVO',
              }))
            }
            className="w-full rounded-lg border border-blue-900 bg-[#020817] px-4 py-3 text-slate-200 outline-none transition focus:border-emerald-400"
          >
            <option value="">Todos</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Profesión
          </label>

          <input
            type="text"
            placeholder="Ej: Desarrollador"
            value={filtros.profesion}
            maxLength={MAX_PROFESION}
            onChange={(event) => handleCambiarProfesion(event.target.value)}
            onBlur={() =>
              setFiltros((prev) => ({
                ...prev,
                profesion: normalizarTexto(prev.profesion),
              }))
            }
            className={`w-full rounded-lg border bg-[#020817] px-4 py-3 text-slate-200 outline-none transition placeholder:text-slate-500 ${
              errores.profesion
                ? 'border-red-500 focus:border-red-400'
                : 'border-blue-900 focus:border-emerald-400'
            }`}
          />

          <div className="mt-1 flex justify-between gap-2">
            <p className="text-xs text-slate-500">
              Máximo {MAX_PROFESION} caracteres.
            </p>
            <p className="text-xs text-slate-500">
              {filtros.profesion.length}/{MAX_PROFESION}
            </p>
          </div>

          {errores.profesion && (
            <p className="mt-2 text-xs font-medium text-red-300">
              {errores.profesion}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            Nombre o correo
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={filtros.busqueda}
              maxLength={MAX_BUSQUEDA}
              onChange={(event) => handleCambiarBusqueda(event.target.value)}
              onBlur={() =>
                setFiltros((prev) => ({
                  ...prev,
                  busqueda: normalizarTexto(prev.busqueda),
                }))
              }
              className={`w-full rounded-lg border bg-[#020817] px-11 py-3 text-slate-200 outline-none transition placeholder:text-slate-500 ${
                errores.busqueda
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-blue-900 focus:border-emerald-400'
              }`}
            />
          </div>

          <div className="mt-1 flex justify-between gap-2">
            <p className="text-xs text-slate-500">
              Máximo {MAX_BUSQUEDA} caracteres.
            </p>
            <p className="text-xs text-slate-500">
              {filtros.busqueda.length}/{MAX_BUSQUEDA}
            </p>
          </div>

          {errores.busqueda && (
            <p className="mt-2 text-xs font-medium text-red-300">
              {errores.busqueda}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-start gap-3 md:justify-end">
          <button
            type="button"
            onClick={handleAplicarFiltros}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Aplicar filtros
          </button>

          <button
            type="button"
            onClick={handleLimpiarFiltros}
            className="flex items-center gap-2 rounded-lg border border-slate-500 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            <RotateCcw size={18} />
            Limpiar
          </button>

          <button
            type="button"
            onClick={exportarPdf}
            className="flex items-center gap-2 rounded-lg border border-blue-500 px-5 py-3 font-semibold text-blue-400 transition hover:bg-blue-500/10"
          >
            <FileDown size={18} />
            Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
};