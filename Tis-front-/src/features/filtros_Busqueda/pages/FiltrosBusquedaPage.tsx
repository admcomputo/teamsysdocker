import { FiltrosBusquedaBar } from "../components/FiltrosBusquedaBar";
import { FiltrosBusquedaList } from "../components/FiltrosBusquedaList";
import { FiltrosBusquedaPagination } from "../components/FiltrosBusquedaPagination";
import { FiltrosBusquedaPanel } from "../components/FiltrosBusquedaPanel";
import { FiltrosBusquedaSort } from "../components/FiltrosBusquedaSort";
import { useFiltrosBusqueda } from "../hooks/useFiltrosBusqueda";
import type { FiltrosBusqueda } from "../models/filtros-busqueda.model";
//import { useEffect } from "react";

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
    setFiltros,
    buscarPortafolios
  } = useFiltrosBusqueda();
console.log("🔍 [Page Render] Estado actual de filtros:", filtros);
  // Manejador para aplicar filtros desde el panel (recibe el objeto completo)
  // Cambia esto en FiltrosBusquedaPage.tsx:
const handleAplicarFiltros = (filtrosCompletos: FiltrosBusqueda) => {
  console.log("📥 [Page - handleAplicarFiltros] Recibido desde el Panel:", filtrosCompletos);
  // 1. Forzamos a que la página se reinicie a 1 en los nuevos filtros
  const filtrosConPaginaFijada = {
    ...filtrosCompletos,
    pagina: 1
  };
  
  console.log("🚀 [Page - handleAplicarFiltros] Enviando de inmediato a buscarPortafolios:", filtrosConPaginaFijada);
  // 2. Actualizamos el estado para que visualmente todo coincida
  setFiltros(filtrosConPaginaFijada); 
  // 3. Ejecutamos la búsqueda pasándole el objeto nuevo de forma DIRECTA e inmediata
  buscarPortafolios(filtrosConPaginaFijada); 
};

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
            onAplicarFiltros={handleAplicarFiltros}
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