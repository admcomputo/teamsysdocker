import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface ExperienciaLaboralResumenDTO {
  nombreEmpresa: string;
  cargoPuesto: string;
  areaProfesional: string;
  especializacion: string;
  fechaInicio: string;
  fechaFin: string | null;
  actualmenteTrabajoAqui: boolean;
  modalidadTrabajo: string | null;
  ubicacion: string;
  tipoContrato: string | null;
  descripcionProyecto: string;
  evidenciaLaboralPdfUrl: string | null;
  proyectoRelacionadoUrl: string | null;
  tecnologias: string[];
}

interface FormacionAcademicaResumenDTO {
  institucion: string;
  tituloObtenido: string;
  nivel: string | null;
  area: string;
  fechaInicio: string;
  fechaFin: string | null;
  descripcion: string;
  estado: string | null;
  urlImagen: string | null;
}

interface HabilidadTecnicaResumenDTO {
  nombre: string;
  categoria: string | null;
  nivelDominio: string | null;
  anosExperiencia: number;
  descripcion: string;
  certificadoUrl: string | null;
}

interface HabilidadBlandaResumenDTO {
  nombre: string;
  categoria: string | null;
  descripcion: string;
  evidenciaUrl: string | null;
}

interface ProyectoResumenDTO {
  titulo: string;
  rolProyecto: string;
  descripcion: string;
  urlsImagenes: string[];
  urlsAdicionales: string[];
  tecnologias: string[];
  enlaceGithub: string | null;
  enlaceDemo: string | null;
  fechaInicio: string;
  fechaFinalizacion: string | null;
  estadoProyecto: string;
}

interface RedSocialResumenDTO {
  nombreRed: string;
  urlPerfil: string;
}

interface PortafolioCompleto {
  nombre: string;
  correo: string;
  foto: string | null;
  profesion: string;
  biografia: string | null;
  telefono: string | null;
  direccion: string | null;
  enlacePublico: string | null;
  experienciasLaborales: ExperienciaLaboralResumenDTO[];
  formacionesAcademica: FormacionAcademicaResumenDTO[];
  habilidadesTecnicas: HabilidadTecnicaResumenDTO[];
  habilidadesBlandas: HabilidadBlandaResumenDTO[];
  proyectos: ProyectoResumenDTO[];
  redesSociales: RedSocialResumenDTO[];
}

export const PortafolioViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portafolio, setPortafolio] = useState<PortafolioCompleto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "experience" | "projects" | "education">("general");

  useEffect(() => {
    const fetchPortafolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const token =
          sessionStorage.getItem("jwt") ||
          sessionStorage.getItem("token") ||
          localStorage.getItem("jwt") ||
          localStorage.getItem("token");

        const response = await fetch(`https://teamsysback.apps.cs.umss.edu.bo/api/portafolio/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar el portafolio del usuario.");
        }

        const data = await response.json();
        setPortafolio(data);
      } catch (err) {
        console.error("Error al cargar portafolio:", err);
        setError(err instanceof Error ? err.message : "Error al cargar portafolio.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortafolio();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-azul-brillante border-t-transparent"></div>
          <p className="mt-4 text-text-secondary">Cargando portafolio profesional...</p>
        </div>
      </div>
    );
  }

  if (error || !portafolio) {
    return (
      <div className="mx-auto max-w-xl text-center py-16 px-4">
        <div className="rounded-3xl border border-red-500/20 bg-red-950/20 p-8 backdrop-blur-md">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-text-primary">Error al cargar portafolio</h2>
          <p className="mt-2 text-text-secondary">{error || "Usuario no encontrado."}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-xl bg-brand-azul-brillante px-6 py-2.5 font-semibold text-white hover:opacity-90 transition"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const fotoPerfil = portafolio.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const telefonoWhatsapp = portafolio.telefono?.replace(/\D/g, "") || "";

  return (
    <div className="relative min-h-[calc(100vh-100px)] py-8 px-4 max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Luces de fondo */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-azul-brillante/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-morado/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Botón de retroceso */}
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-text-secondary hover:text-brand-azul-brillante transition font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>
      </div>

      {/* Cabecera de Perfil */}
      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-brand-azul-brillante/30 shadow-lg bg-[#0F223D] shrink-0">
              <img src={fotoPerfil} className="w-full h-full object-cover" alt={portafolio.nombre} />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">{portafolio.nombre}</h1>
              <p className="text-base sm:text-lg text-brand-azul-brillante font-semibold mt-1">{portafolio.profesion}</p>
              {portafolio.direccion && (
                <p className="text-sm text-text-secondary mt-1 flex items-center justify-center md:justify-start gap-1">
                  <svg className="w-4 h-4 text-brand-morado" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {portafolio.direccion}
                </p>
              )}
              {portafolio.biografia && (
                <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-2xl leading-relaxed">{portafolio.biografia}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            {portafolio.correo && (
              <a
                href={`mailto:${portafolio.correo}`}
                className="flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#112F58] text-[#E2F0FF] border border-brand-azul-brillante/30 py-2.5 px-5 rounded-xl transition text-sm font-semibold shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contactar por Correo
              </a>
            )}
            {portafolio.telefono && telefonoWhatsapp && (
              <a
                href={`https://wa.me/${telefonoWhatsapp.startsWith("591") ? telefonoWhatsapp : `591${telefonoWhatsapp}`}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 py-2.5 px-5 rounded-xl transition text-sm font-semibold shadow-md"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993C16.48 1.873 14.004.84 11.37.84c-5.446 0-9.873 4.42-9.877 9.866-.001 1.702.461 3.351 1.34 4.8l-.995 3.636 3.719-.948zm12.39-7.39c-.27-.136-1.602-.79-1.85-.882-.25-.091-.43-.136-.61.136-.18.27-.7.882-.856 1.063-.156.183-.312.204-.582.068-.27-.136-1.143-.42-2.178-1.342-.805-.718-1.348-1.605-1.506-1.877-.158-.272-.017-.42.119-.556.122-.122.27-.317.405-.476.136-.16.18-.272.27-.454.09-.18.045-.34-.022-.476-.068-.136-.61-1.474-.836-2.019-.22-.53-.442-.458-.61-.466-.156-.008-.337-.01-.518-.01-.18 0-.473.068-.72.34-.248.272-.946.924-.946 2.253 0 1.33.968 2.613 1.103 2.795.136.182 1.905 2.91 4.617 4.08.645.278 1.148.445 1.54.57.65.206 1.24.177 1.707.107.52-.078 1.602-.655 1.828-1.287.226-.632.226-1.177.158-1.287-.068-.11-.25-.195-.52-.332z" />
                </svg>
                Escribir por WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Pestañas de Navegación */}
      <div className="flex border-b border-card-border/80 p-1 bg-card-bg/20 rounded-xl max-w-fit gap-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeTab === "general" ? "bg-brand-azul-brillante text-white shadow-md" : "text-text-secondary hover:text-text-primary"}`}
        >
          Resumen General
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeTab === "experience" ? "bg-brand-azul-brillante text-white shadow-md" : "text-text-secondary hover:text-text-primary"}`}
        >
          Experiencia y Skills
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeTab === "projects" ? "bg-brand-azul-brillante text-white shadow-md" : "text-text-secondary hover:text-text-primary"}`}
        >
          Proyectos ({portafolio.proyectos.length})
        </button>
        <button
          onClick={() => setActiveTab("education")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${activeTab === "education" ? "bg-brand-azul-brillante text-white shadow-md" : "text-text-secondary hover:text-text-primary"}`}
        >
          Educación y Enlaces
        </button>
      </div>

      {/* Contenido de Pestañas */}
      <div className="flex-1 space-y-6">
        {/* PESTAÑA: RESUMEN GENERAL */}
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tarjeta de Biografía / Presentación */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Sobre Mí</h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {portafolio.biografia || "El profesional no ha ingresado una descripción biográfica por el momento."}
                </p>
              </div>

              {/* Redes Sociales Aplanadas */}
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Enlaces Profesionales</h3>
                {portafolio.redesSociales.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {portafolio.redesSociales.map((red, index) => (
                      <a
                        key={index}
                        href={red.urlPerfil}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#0B1F3A]/60 border border-card-border/80 px-4 py-2.5 rounded-xl hover:border-brand-azul-brillante/50 hover:bg-brand-azul-brillante/5 transition text-sm font-medium"
                      >
                        <span className="text-brand-azul-brillante font-semibold">{red.nombreRed}</span>
                        <svg className="w-3.5 h-3.5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Sin enlaces adicionales disponibles.</p>
                )}
              </div>
            </div>

            {/* Columna derecha: Detalles rápidos */}
            <div className="space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Información Rápida</h3>
                <div className="space-y-4 text-sm">
                  {portafolio.correo && (
                    <div>
                      <span className="block text-xs text-text-secondary uppercase tracking-wider font-semibold">Correo Electrónico</span>
                      <span className="text-text-primary font-medium">{portafolio.correo}</span>
                    </div>
                  )}
                  {portafolio.telefono && (
                    <div>
                      <span className="block text-xs text-text-secondary uppercase tracking-wider font-semibold">Teléfono / WhatsApp</span>
                      <span className="text-text-primary font-medium">{portafolio.telefono}</span>
                    </div>
                  )}
                  {portafolio.direccion && (
                    <div>
                      <span className="block text-xs text-text-secondary uppercase tracking-wider font-semibold">Ubicación</span>
                      <span className="text-text-primary font-medium">{portafolio.direccion}</span>
                    </div>
                  )}
                  <div>
                    <span className="block text-xs text-text-secondary uppercase tracking-wider font-semibold">Modalidad Preferida</span>
                    <span className="text-brand-morado font-semibold">
                      {portafolio.experienciasLaborales[0]?.modalidadTrabajo || "No especificada"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: EXPERIENCIA Y SKILLS */}
        {activeTab === "experience" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Experiencia Laboral (Columna Izquierda) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-6">Trayectoria Profesional</h3>
                {portafolio.experienciasLaborales.length > 0 ? (
                  <div className="relative border-l border-brand-azul-brillante/30 ml-4 space-y-8">
                    {portafolio.experienciasLaborales.map((exp, index) => (
                      <div key={index} className="relative pl-6">
                        {/* Marcador de línea de tiempo */}
                        <div className="absolute -left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border border-brand-azul-brillante bg-bg-dark flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-azul-brillante"></div>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-base sm:text-lg font-bold text-text-primary">{exp.cargoPuesto}</h4>
                            <span className="rounded-full bg-brand-azul-brillante/10 border border-brand-azul-brillante/20 px-3 py-0.5 text-xs font-semibold text-brand-azul-brillante">
                              {exp.fechaInicio} — {exp.actualmenteTrabajoAqui ? "Presente" : exp.fechaFin}
                            </span>
                          </div>

                          <p className="text-sm font-semibold text-brand-morado mt-0.5">
                            {exp.nombreEmpresa} <span className="text-text-secondary font-normal">({exp.ubicacion})</span>
                          </p>

                          {exp.modalidadTrabajo && (
                            <span className="mt-2 inline-block rounded-md bg-card-border/30 px-2 py-0.5 text-xs text-text-secondary font-medium">
                              {exp.modalidadTrabajo} · {exp.tipoContrato || "Contrato"}
                            </span>
                          )}

                          <p className="mt-3 text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                            {exp.descripcionProyecto}
                          </p>

                          {exp.tecnologias && exp.tecnologias.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {exp.tecnologias.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-[#0B1F3A] border border-brand-azul-brillante/20 px-2.5 py-0.5 text-xs text-[#E2F0FF] font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {exp.evidenciaLaboralPdfUrl && (
                            <div className="mt-3">
                              <a
                                href={exp.evidenciaLaboralPdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-brand-azul-brillante hover:underline font-semibold"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Ver Certificado / Evidencia PDF
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Sin experiencia registrada en el portafolio.</p>
                )}
              </div>
            </div>

            {/* Habilidades Técnicas y Blandas (Columna Derecha) */}
            <div className="space-y-6">
              {/* Hard Skills */}
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Habilidades Técnicas</h3>
                {portafolio.habilidadesTecnicas.length > 0 ? (
                  <div className="space-y-4">
                    {portafolio.habilidadesTecnicas.map((skill, index) => (
                      <div key={index} className="border-b border-card-border/20 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="font-semibold text-text-primary">{skill.nombre}</span>
                          <span className="text-xs text-brand-azul-brillante font-semibold bg-brand-azul-brillante/10 px-2 py-0.5 rounded">
                            {skill.nivelDominio || "Conocimiento"}
                          </span>
                        </div>
                        {skill.categoria && (
                          <span className="text-[10px] text-brand-morado font-medium uppercase tracking-wider block mb-1">
                            {skill.categoria}
                          </span>
                        )}
                        {skill.anosExperiencia !== undefined && skill.anosExperiencia > 0 && (
                          <p className="text-xs text-text-secondary">{skill.anosExperiencia} {skill.anosExperiencia === 1 ? "año" : "años"} de experiencia</p>
                        )}
                        {skill.certificadoUrl && (
                          <a
                            href={skill.certificadoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-brand-azul-brillante hover:underline font-semibold mt-1"
                          >
                            Ver Certificación →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Sin habilidades técnicas registradas.</p>
                )}
              </div>

              {/* Soft Skills */}
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Habilidades Blandas</h3>
                {portafolio.habilidadesBlandas.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {portafolio.habilidadesBlandas.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-[#0B1F3A]/60 border border-card-border/80 px-3.5 py-2 rounded-xl text-center flex-1 min-w-[120px]"
                      >
                        <h4 className="text-sm font-bold text-text-primary">{skill.nombre}</h4>
                        {skill.categoria && <span className="text-[10px] text-text-secondary">{skill.categoria}</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Sin habilidades blandas registradas.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: PROYECTOS */}
        {activeTab === "projects" && (
          <div>
            {portafolio.proyectos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portafolio.proyectos.map((pro, index) => (
                  <article
                    key={index}
                    className="bg-card-bg/50 backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden hover:border-brand-azul-brillante/30 transition flex flex-col h-full shadow-lg"
                  >
                    {/* Imagen de Portada del Proyecto */}
                    <div className="h-48 overflow-hidden bg-[#0A1A2F] relative border-b border-card-border">
                      {pro.urlsImagenes && pro.urlsImagenes.length > 0 ? (
                        <img
                          src={pro.urlsImagenes[0]}
                          alt={pro.titulo}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-secondary">
                          <svg className="w-12 h-12 text-card-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute bottom-3 right-3 bg-brand-azul-brillante/95 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                        {pro.estadoProyecto || "Terminado"}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1 gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-text-primary tracking-tight">{pro.titulo}</h4>
                        <p className="text-xs text-brand-morado font-semibold uppercase tracking-wider mt-0.5">{pro.rolProyecto}</p>
                        {pro.fechaInicio && (
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            Periodo: {pro.fechaInicio} — {pro.fechaFinalizacion || "Presente"}
                          </p>
                        )}
                      </div>

                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">{pro.descripcion}</p>

                      {pro.tecnologias && pro.tecnologias.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {pro.tecnologias.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-[#0B1F3A] border border-brand-azul-brillante/15 px-2.5 py-0.5 text-xs text-[#E2F0FF] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-3 border-t border-card-border/40 justify-end mt-auto">
                        {pro.enlaceGithub && (
                          <a
                            href={pro.enlaceGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-text-primary hover:text-brand-azul-brillante font-semibold transition"
                          >
                            GitHub
                          </a>
                        )}
                        {pro.enlaceDemo && (
                          <a
                            href={pro.enlaceDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-azul-brillante hover:opacity-90 text-white text-xs font-semibold px-4.5 py-2 rounded-xl transition"
                          >
                            Demo En Vivo
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-card-border bg-card-bg/30 p-8 text-center">
                <p className="text-sm text-text-secondary">Este profesional aún no posee proyectos públicos publicados.</p>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA: EDUCACIÓN */}
        {activeTab === "education" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formación Académica (Columna Izquierda) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-6">Educación y Formación</h3>
                {portafolio.formacionesAcademica.length > 0 ? (
                  <div className="relative border-l border-brand-morado/30 ml-4 space-y-8">
                    {portafolio.formacionesAcademica.map((form, index) => (
                      <div key={index} className="relative pl-6">
                        {/* Marcador de línea de tiempo */}
                        <div className="absolute -left-1.5 top-1.5 h-3.5 w-3.5 rounded-full border border-brand-morado bg-bg-dark flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-morado"></div>
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-base sm:text-lg font-bold text-text-primary">{form.tituloObtenido}</h4>
                            <span className="rounded-full bg-brand-morado/10 border border-brand-morado/20 px-3 py-0.5 text-xs font-semibold text-brand-morado">
                              {form.fechaInicio} — {form.fechaFin || "Presente"}
                            </span>
                          </div>

                          <p className="text-sm font-semibold text-brand-azul-brillante mt-0.5">
                            {form.institucion} <span className="text-text-secondary font-normal">({form.area})</span>
                          </p>

                          {form.nivel && (
                            <span className="mt-2 inline-block rounded-md bg-card-border/30 px-2 py-0.5 text-xs text-text-secondary font-medium">
                              Nivel: {form.nivel} · Estado: {form.estado || "Completado"}
                            </span>
                          )}

                          {form.descripcion && (
                            <p className="mt-3 text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                              {form.descripcion}
                            </p>
                          )}

                          {form.urlImagen && (
                            <div className="mt-4 max-w-sm rounded-xl overflow-hidden border border-card-border">
                              <img src={form.urlImagen} alt="Formación" className="w-full h-auto object-cover max-h-48" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Sin formación académica registrada en el portafolio.</p>
                )}
              </div>
            </div>

            {/* Enlaces y Redes (Columna Derecha) */}
            <div className="space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-azul-brillante/10 rounded-xl flex items-center justify-center text-brand-azul-brillante shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs text-text-secondary font-semibold">Correo Electrónico</span>
                      <a href={`mailto:${portafolio.correo}`} className="text-sm text-brand-azul-brillante hover:underline font-medium break-all">
                        {portafolio.correo}
                      </a>
                    </div>
                  </div>

                  {portafolio.telefono && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center text-[#25D366] shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs text-text-secondary font-semibold">Teléfono / Celular</span>
                        <span className="text-sm text-text-primary font-medium">{portafolio.telefono}</span>
                      </div>
                    </div>
                  )}

                  {portafolio.enlacePublico && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-morado/10 rounded-xl flex items-center justify-center text-brand-morado shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs text-text-secondary font-semibold">Enlace Público Oficial</span>
                        <a
                          href={portafolio.enlacePublico}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-morado hover:underline font-medium break-all"
                        >
                          Ver enlace público
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
