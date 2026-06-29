import type { FormEvent } from "react";

interface FiltrosBusquedaBarProps {
  valor: string;
  cargando: boolean;
  onChange: (valor: string) => void;
  onBuscar: () => void;
}

export const FiltrosBusquedaBar = ({
  valor,
  cargando,
  onChange,
  onBuscar,
}: FiltrosBusquedaBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onBuscar();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 rounded-2xl border border-card-border bg-[#0B1F3A]/80 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] md:flex-row md:items-center">
        <div className="flex-1">
          <label
            htmlFor="buscar-portafolios"
            className="mb-1 block text-sm font-medium text-[#E2F0FF]"
          >
            Buscar portafolio
          </label>

          <input
            id="buscar-portafolios"
            type="text"
            value={valor}
            maxLength={80}
            placeholder="Ej: Gabriel, Desarrollador, Cochabamba"
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded-xl border border-card-border bg-[#061327] px-4 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />

          <p className="mt-1 text-xs text-text-secondary">
            Busca por nombre, profesión o ciudad. Para búsquedas más específicas usa los filtros avanzados.
          </p>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="rounded-xl bg-brand-azul-brillante px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </form>
  );
};