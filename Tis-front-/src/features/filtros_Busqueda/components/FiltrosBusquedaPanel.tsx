import { opcionesDisponibilidad } from "../models/filtros-busqueda.model";

import type { FiltrosBusqueda } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaPanelProps {
  filtros: FiltrosBusqueda;
  cargando: boolean;
  onActualizarFiltro: (
    campo: keyof FiltrosBusqueda,
    valor: string | number | string[],
  ) => void;
  
  onAplicarFiltros: () => void;
  onLimpiarFiltros: () => void;
}

export const FiltrosBusquedaPanel = ({
  filtros,
  cargando,
  onActualizarFiltro,
  
  onAplicarFiltros,
  onLimpiarFiltros,
}: FiltrosBusquedaPanelProps) => {
  return (
    <aside className="rounded-2xl border border-card-border bg-[#0B1F3A]/80 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#E2F0FF]">Filtros avanzados</h2>
        <p className="text-sm text-gray-400">
          Refina la búsqueda de portafolios profesionales.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Profesión
          </label>
          <input
            type="text"
            value={filtros.profesion}
            maxLength={60}
            placeholder="Ej: Desarrollador de Software"
            onChange={(event) =>
              onActualizarFiltro("profesion", event.target.value)
            }
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">
            Solo letras y espacios.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Especialización
          </label>
          <input
            type="text"
            value={filtros.especializacion}
            maxLength={60}
            placeholder="Ej: Frontend, Desarrollo móvil"
            onChange={(event) =>
              onActualizarFiltro("especializacion", event.target.value)
            }
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">
            No permite números ni caracteres especiales.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Tecnología
          </label>
          <input
            type="text"
            value={filtros.tecnologia}
            maxLength={50}
            placeholder="Ej: React, Angular, C#, Node.js"
            onChange={(event) =>
              onActualizarFiltro("tecnologia", event.target.value)
            }
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">
            Permite letras, números, punto, guion, +, # y /.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Institución académica
          </label>
          <input
            type="text"
            value={filtros.formacionAcademica}
            maxLength={80}
            placeholder="Ej: Universidad Mayor de San Simón"
            onChange={(event) =>
              onActualizarFiltro("formacionAcademica", event.target.value)
            }
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">
            Busca por universidad, instituto o centro de estudios.
          </p>
        </div>


<div>
  <label className="mb-1 block text-sm font-medium text-text-primary">
    Empresa / experiencia laboral
  </label>
  <input
    type="text"
    value={filtros.empresa}
    maxLength={80}
    placeholder="Ej: COMTECO, Tigo, ENTEL"
    onChange={(event) =>
      onActualizarFiltro("empresa", event.target.value)
    }
    className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
  />
  <p className="mt-1 text-xs text-gray-400">
    Busca por empresas donde trabajó o tiene experiencia.
  </p>
</div>






        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Ubicación
          </label>
          <input
            type="text"
            value={filtros.ubicacion}
            maxLength={80}
            placeholder="Ej: Cochabamba, Bolivia"
            onChange={(event) =>
              onActualizarFiltro("ubicacion", event.target.value)
            }
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          />
          <p className="mt-1 text-xs text-gray-400">
            Permite letras, coma, punto y guion.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-primary">
            Disponibilidad
          </label>
          <select
            value={filtros.disponibilidad}
            onChange={(event) =>
              onActualizarFiltro("disponibilidad", event.target.value)
            }
            className="w-full rounded-xl border border-card-border bg-[#061327] px-3 py-2 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus:border-brand-azul-brillante focus:ring-2 focus:ring-brand-azul-brillante/20"
          >
            {opcionesDisponibilidad.map((opcion) => (
              <option key={opcion || "todas"} value={opcion}>
                {opcion || "Todas"}
              </option>
            ))}
          </select>
        </div>

 

      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
        <button
          type="button"
          disabled={cargando}
          onClick={onAplicarFiltros}
          className="rounded-xl bg-brand-azul-brillante px-8 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {cargando ? "Aplicando..." : "Aplicar filtros"}
        </button>

        <button
          type="button"
          disabled={cargando}
          onClick={onLimpiarFiltros}
          className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          Limpiar filtros
        </button>
      </div>
    </aside>
  );
};