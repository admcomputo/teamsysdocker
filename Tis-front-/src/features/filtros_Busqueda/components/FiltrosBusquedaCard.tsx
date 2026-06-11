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
    <article className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-brand-azul-brillante/50">

      {/* Top Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-azul-brillante/20 text-sm font-bold text-brand-azul-brillante">
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
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${portafolio.disponibilidad === "Disponible"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
              }`}
          >
            {portafolio.disponibilidad || "Sin estado"}
          </span>
        </div>

        <div>
          <h3 className="line-clamp-1 text-base font-bold text-text-primary transition-colors group-hover:text-brand-accent-neon">
            {portafolio.nombreCompleto}
          </h3>
          <p className="line-clamp-1 text-sm font-medium text-text-secondary">
            {portafolio.profesion}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 text-xs text-text-muted">
          {portafolio.especializacion && (
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="line-clamp-1">{portafolio.especializacion}</span>
            </span>
          )}

          {portafolio.resumen && (
            <p className="line-clamp-2 leading-relaxed">{portafolio.resumen}</p>
          )}
        </div>

        {/* Tech & Lang */}
        <div className="mt-1 flex flex-wrap gap-1.5">
          {portafolio.tecnologias.slice(0, 3).map((tech) => (
            <span key={tech} className="rounded-full border border-brand-azul-brillante/20 bg-brand-azul-brillante/10 px-2 py-0.5 text-[10px] font-medium text-brand-azul-brillante">
              {tech}
            </span>
          ))}
          {portafolio.tecnologias.length > 3 && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-text-muted">
              +{portafolio.tecnologias.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex border-t border-white/8 pt-4">
        <a
          href={portafolio.urlPublica}
          className="rounded-xl bg-brand-azul-brillante px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Ver perfil
        </a>
      </div>
    </article>
  );
};