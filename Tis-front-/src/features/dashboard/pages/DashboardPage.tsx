import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/context/AuthContext';
import {
  FiltrosBusquedaBar,
  FiltrosBusquedaPanel,
  FiltrosBusquedaList,
  FiltrosBusquedaPagination,
  useFiltrosBusqueda,
} from '@/features/filtros_Busqueda';
import { BarChart3, SlidersHorizontal } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const esAdministrador = user?.roles?.includes('ROLE_ADMIN');
  const navigate = useNavigate();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const {
    filtros,
    resultados,
    totalPaginas,
    cargando,
    error,
    actualizarFiltro,
    cambiarPagina,
    aplicarFiltros,
    limpiarFiltros,
  } = useFiltrosBusqueda();

  const irAReportesUsuarios = () => {
    navigate('/admin/reportes/usuarios');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            ¡Hola, {user?.fullName?.split(' ')[0] || 'Usuario'}! 
          </h1>
          <p className="text-text-secondary mt-1">
            Bienvenido a tu inicio.
          </p>
        </div>
      </div>

      {esAdministrador && (
        <div className="rounded-2xl border border-card-border bg-brand-azul-medio/40 p-6 shadow-lg">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-brand-azul-brillante/20 p-4 text-brand-azul-neon">
                <BarChart3 size={30} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#E2F0FF]">
                  Reportes de Usuarios
                </h2>

                <p className="mt-2 max-w-2xl text-text-secondary">
                  Consulta el reporte general de usuarios registrados, revisa
                  usuarios activos e inactivos, aplica filtros y exporta la
                  información en PDF.
                </p>

                <p className="mt-3 text-sm font-medium text-emerald-400">
                  Acceso destinado al administrador del sistema.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={irAReportesUsuarios}
              className="rounded-xl bg-brand-azul-brillante px-5 py-3 font-semibold text-white transition-all hover:bg-blue-500"
            >
              Ir a reportes
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#E2F0FF] tracking-tight">
            Usuarios Registrados
          </h2>

          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all cursor-pointer w-full sm:w-auto justify-center sm:justify-start ${mostrarFiltros
              ? 'bg-brand-azul-brillante/20 border-brand-azul-brillante text-brand-azul-neon shadow-[0_0_12px_rgba(47,128,237,0.3)]'
              : 'bg-brand-azul-medio/50 border-card-border text-text-secondary hover:border-brand-azul-brillante/50 hover:text-text-primary'
              }`}
          >
            <SlidersHorizontal size={16} />
            <span>{mostrarFiltros ? 'Ocultar Filtros' : 'Filtros Avanzados'}</span>
          </button>
        </div>

        <div className="space-y-6">
          <FiltrosBusquedaBar
            valor={filtros.buscar}
            cargando={cargando}
            onChange={(valor) => actualizarFiltro('buscar', valor)}
            onBuscar={aplicarFiltros}
          />

          {mostrarFiltros && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <FiltrosBusquedaPanel
                filtros={filtros}
                cargando={cargando}
                //onActualizarFiltro={actualizarFiltro}
                onAplicarFiltros={aplicarFiltros}
                onLimpiarFiltros={limpiarFiltros}
              />
            </div>
          )}

          <div className="space-y-4">


            <FiltrosBusquedaList
              resultados={resultados}
              cargando={cargando}
              error={error}
            />

            <FiltrosBusquedaPagination
              paginaActual={filtros.pagina}
              totalPaginas={totalPaginas}
              cargando={cargando}
              onCambiarPagina={cambiarPagina}
            />
          </div>
        </div>
      </div>
    </div>
  );
};