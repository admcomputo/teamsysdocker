import {
  opcionesOrdenarPor,
  type OrdenarPor,
} from "../models/filtros-busqueda.model";

interface FiltrosBusquedaSortProps {
  valor: OrdenarPor;
  total: number;
  onCambiarOrden: (ordenarPor: OrdenarPor) => void;
}

export const FiltrosBusquedaSort = ({
  valor,
  total,
  onCambiarOrden,
}: FiltrosBusquedaSortProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-card-border bg-[#0B1F3A]/80 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#E2F0FF]">
          {total} portafolio{total === 1 ? "" : "s"} encontrado
          {total === 1 ? "" : "s"}
        </p>
        <p className="text-xs text-text-secondary">
          Ordena los resultados según tu necesidad.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="ordenar-portafolios"
          className="text-sm font-medium text-text-primary"
        >
          Ordenar por:
        </label>

        <select
          id="ordenar-portafolios"
          value={valor}
          onChange={(event) => onCambiarOrden(event.target.value as OrdenarPor)}
         className="rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary  outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {opcionesOrdenarPor.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};