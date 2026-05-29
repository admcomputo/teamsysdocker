import { useState } from 'react';
import { useAuth } from '@/core/context/AuthContext';
import {
  FiltrosBusquedaBar,
  FiltrosBusquedaPanel,
  FiltrosBusquedaSort,
  FiltrosBusquedaList,
  FiltrosBusquedaPagination,
  useFiltrosBusqueda,
} from '@/features/filtros_Busqueda';
import { SlidersHorizontal } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const {
    filtros,
    resultados,
    total,
    totalPaginas,
    cargando,
    error,
    actualizarFiltro,
    cambiarOrden,
    cambiarPagina,
    aplicarFiltros,
    limpiarFiltros,
  } = useFiltrosBusqueda();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            ¡Hola, {user?.fullName?.split(' ')[0] || 'Usuario'}! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            Bienvenido a tu panel de control de Portafolios TIS.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#E2F0FF] tracking-tight">
            Usuarios Registrados
          </h2>
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              mostrarFiltros
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
            onChange={(valor) => actualizarFiltro("buscar", valor)}
            onBuscar={aplicarFiltros}
          />

          {mostrarFiltros && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <FiltrosBusquedaPanel
                filtros={filtros}
                cargando={cargando}
                onActualizarFiltro={actualizarFiltro}
                onAplicarFiltros={aplicarFiltros}
                onLimpiarFiltros={limpiarFiltros}
              />
            </div>
          )}

          <div className="space-y-4">
            <FiltrosBusquedaSort
              valor={filtros.ordenarPor}
              total={total}
              onCambiarOrden={cambiarOrden}
            />

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