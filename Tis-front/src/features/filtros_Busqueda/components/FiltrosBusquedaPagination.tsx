interface FiltrosBusquedaPaginationProps {
  paginaActual: number;
  totalPaginas: number;
  cargando: boolean;
  onCambiarPagina: (pagina: number) => void;
}

export const FiltrosBusquedaPagination = ({
  paginaActual,
  totalPaginas,
  cargando,
  onCambiarPagina,
}: FiltrosBusquedaPaginationProps) => {
  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 rounded-2xl border border-card-border bg-[#0B1F3A]/80 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <button
        type="button"
        disabled={cargando || paginaActual <= 1}
        onClick={() => onCambiarPagina(paginaActual - 1)}
        className="rounded-xl border border-card-border px-4 py-2 text-sm font-semibold text-[#E2F0FF] transition hover:bg-brand-azul-medio/50 hover:border-brand-azul-brillante disabled:cursor-not-allowed disabled:text-text-muted disabled:hover:bg-transparent disabled:hover:border-card-border disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="text-sm font-medium text-text-secondary">
        Página <span className="font-semibold text-brand-azul-neon">{paginaActual}</span> de <span className="font-semibold text-[#E2F0FF]">{totalPaginas}</span>
      </span>

      <button
        type="button"
        disabled={cargando || paginaActual >= totalPaginas}
        onClick={() => onCambiarPagina(paginaActual + 1)}
        className="rounded-xl border border-card-border px-4 py-2 text-sm font-semibold text-[#E2F0FF] transition hover:bg-brand-azul-medio/50 hover:border-brand-azul-brillante disabled:cursor-not-allowed disabled:text-text-muted disabled:hover:bg-transparent disabled:hover:border-card-border disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};