import { FiltrosBusquedaCard } from "./FiltrosBusquedaCard";

import type { PortafolioResultado } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaListProps {
  resultados: PortafolioResultado[];
  cargando: boolean;
  error: string | null;
}

export const FiltrosBusquedaList = ({
  resultados,
  cargando,
  error,
}: FiltrosBusquedaListProps) => {
  if (cargando) {
    return (
      <div className="rounded-2xl border border-card-border bg-bg-dark/80 p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-text-secondary">
          Buscando portafolios...
        </p>
      </div>
    );
  }

  if (error) {
  return (
    <div className="rounded-2xl border border-brand-azul-brillante/30 bg-[#0B1F3A]/80 p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <p className="text-sm font-semibold text-[#E2F0FF]">
        No hay portafolios para mostrar por el momento.
      </p>
      <p className="mt-1 text-xs text-text-secondary">
        Prueba aplicando otros filtros o intenta nuevamente más tarde.
      </p>
    </div>
  );
}

  if (resultados.length === 0) {
    return (
      <div className="rounded-2xl border border-card-border bg-bg-dark/80 p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-text-primary">
          No se encontraron portafolios.
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          Prueba cambiando o limpiando los filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {resultados.map((portafolio) => (
        <FiltrosBusquedaCard key={portafolio.id} portafolio={portafolio} />
      ))}
    </div>
  );
};