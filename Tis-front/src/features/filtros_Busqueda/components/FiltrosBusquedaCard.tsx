import type { PortafolioResultado } from "../models/filtros-busqueda.model";

interface FiltrosBusquedaCardProps {
  portafolio: PortafolioResultado;
}

export const FiltrosBusquedaCard = ({ portafolio }: FiltrosBusquedaCardProps) => {
  const iniciales = portafolio.nombreCompleto
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");

  return (
    <article className="rounded-2xl border border-card-border bg-[#0B1F3A]/80 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition hover:border-brand-azul-brillante/60">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand-azul-brillante/20 text-xl font-bold text-brand-azul-brillante">
          {portafolio.fotoPerfilUrl ? (
            <img
              src={portafolio.fotoPerfilUrl}
              alt={portafolio.nombreCompleto}
              className="h-full w-full object-cover"
            />
          ) : (
            iniciales
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#E2F0FF]">
                {portafolio.nombreCompleto}
              </h3>

              <p className="text-sm font-semibold text-brand-azul-brillante">
                {portafolio.profesion}
              </p>

              {portafolio.especializacion && (
                <p className="mt-1 text-sm text-text-secondary">
                  {portafolio.especializacion}
                </p>
              )}
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${portafolio.disponibilidad === "Disponible"
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-yellow-500/15 text-yellow-300"
                }`}
            >
              {portafolio.disponibilidad || "Sin estado"}
            </span>
          </div>

          {portafolio.resumen && (
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-text-secondary">
              {portafolio.resumen}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {portafolio.tecnologias.length > 0 ? (
              portafolio.tecnologias.slice(0, 5).map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="rounded-full bg-[#1E3A5F] px-3 py-1 text-xs font-medium text-[#E2F0FF]"
                >
                  {tecnologia}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-secondary">
                Sin tecnologías registradas
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-text-secondary">Idiomas:</span>

            {portafolio.idiomas.length > 0 ? (
              portafolio.idiomas.map((idioma) => (
                <span
                  key={idioma}
                  className="rounded-full border border-card-border bg-[#061327] px-3 py-1 text-xs font-medium text-[#E2F0FF]"
                >
                  {idioma}
                </span>
              ))
            ) : (
              <span className="text-xs text-text-secondary">No registrados</span>
            )}
          </div>

          <div className="mt-5 grid gap-3 text-sm text-text-primary md:grid-cols-4">
            <div className="rounded-xl border border-card-border bg-[#061327] p-3">
              <span className="block text-xs text-text-secondary">Ubicación</span>
              {portafolio.ubicacion}
            </div>

            <div className="rounded-xl border border-card-border bg-[#061327] p-3">
              <span className="block text-xs text-text-secondary">Modalidad</span>
              {portafolio.modalidadTrabajo || "No definida"}
            </div>

            <div className="rounded-xl border border-card-border bg-[#061327] p-3">
              <span className="block text-xs text-text-secondary">Experiencia</span>
              {portafolio.experienciaAnios} años
            </div>

            <div className="rounded-xl border border-card-border bg-[#061327] p-3">
              <span className="block text-xs text-text-secondary">Proyectos</span>
              {portafolio.cantidadProyectos}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <a
              href={portafolio.urlPublica}
              className="rounded-xl bg-brand-azul-brillante px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Ver perfil
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};