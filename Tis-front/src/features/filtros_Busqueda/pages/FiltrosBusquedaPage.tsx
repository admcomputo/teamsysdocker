import { FiltrosBusquedaBar } from "../components/FiltrosBusquedaBar";
import { FiltrosBusquedaList } from "../components/FiltrosBusquedaList";
import { FiltrosBusquedaPagination } from "../components/FiltrosBusquedaPagination";
import { FiltrosBusquedaPanel } from "../components/FiltrosBusquedaPanel";
import { FiltrosBusquedaSort } from "../components/FiltrosBusquedaSort";
import { useFiltrosBusqueda } from "../hooks/useFiltrosBusqueda";

export const FiltrosBusquedaPage = () => {
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
    <main className="min-h-screen bg-bg-dark px-4 py-8 text-text-primary">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#E2F0FF] md:text-3xl">
            Buscar portafolios
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Encuentra profesionales usando filtros por profesión, tecnología,
            experiencia, idioma, ubicación y modalidad de trabajo.
          </p>
        </div>

        <div className="mb-6">
          <FiltrosBusquedaBar
            valor={filtros.buscar}
            cargando={cargando}
            onChange={(valor) => actualizarFiltro("buscar", valor)}
            onBuscar={aplicarFiltros}
          />
        </div>

        <div className="space-y-5">
          <FiltrosBusquedaPanel
            filtros={filtros}
            cargando={cargando}
            onActualizarFiltro={actualizarFiltro}
            onAplicarFiltros={aplicarFiltros}
            onLimpiarFiltros={limpiarFiltros}
          />

          <section className="space-y-4">
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
          </section>
        </div>
      </section>
    </main>
  );
};