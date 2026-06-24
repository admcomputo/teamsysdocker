// src/features/profile/pages/PortafolioPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Heart,
  ArrowLeft,
  Github,
  FileText,
  Image as ImageIcon,
  Calendar,
  Code2,
  Linkedin,
  Twitter,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

// ==================== INTERFACES (igual que antes) ====================
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
  urlPdfs?: string[];
  urlsAdicionales: string[];
  tecnologias: string[];
  enlaceGithub: string | null;
  enlaceDemo: string | null;
  fechaInicio: string;
  fechaFinalizacion: string | null;
  estadoProyecto: string;
  destacar: boolean;

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

// ==================== UTILIDAD: extraer slug de enlacePublico ====================
const extraerSlugDeEnlacePublico = (enlacePublico: string | null): string | null => {
  if (!enlacePublico) return null;
  // Suponiendo que el enlace es algo como "https://frontend.com/share/textoUrl"
  // o "http://localhost:3000/portafolio/publico/textoUrl"
  const partes = enlacePublico.split('/');
  return partes[partes.length - 1];
};

// Fallback: convertir correo a slug URL‑safe (mismo algoritmo que el backend)
const correoToSlug = (correo: string): string => {
  return btoa(correo)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// ==================== COMPONENTE PRINCIPAL ====================
export const PortafolioPage = () => {
  const { id, textoUrl } = useParams<{ id?: string; textoUrl?: string }>();
  const navigate = useNavigate();

  const [portafolio, setPortafolio] = useState<PortafolioCompleto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "experience" | "projects" | "education">("general");
const [totalLikes, setTotalLikes] = useState(0);
const [liked, setLiked] = useState(false);
const [processingLike, setProcessingLike] = useState(false);
  const [slugPrivado, setSlugPrivado] = useState<string | null>(null);

  const isPublicMode = !!textoUrl;
  const identifier = isPublicMode ? textoUrl! : id!;

  // ==================== CARGA DE DATOS ====================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isPublicMode) {
          // --- MODO PÚBLICO ---
const token =
  sessionStorage.getItem("jwt") ||
  sessionStorage.getItem("token") ||
  localStorage.getItem("jwt") ||
  localStorage.getItem("token");

const [
  profileRes,
  expRes,
  projRes,
  techRes,
  softRes,
  eduRes,
  likesRes,
  likedRes,
] = await Promise.all([
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/profile/${textoUrl}`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/experiencias/${textoUrl}`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/proyectos/${textoUrl}`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/habilidades-tecnicas/${textoUrl}`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/habilidades-blandas/${textoUrl}`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/formaciones/${textoUrl}`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/profile/${textoUrl}/likes/total`),
  fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/profile/${textoUrl}/liked`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }),
]);

          if (!profileRes.ok) throw new Error("No se pudo cargar el perfil público.");
          const profileData = await profileRes.json();
          if (likesRes.ok) {
            const likesData = await likesRes.json();
            setTotalLikes(likesData.totalLikes);
          }
          
          if (likedRes.ok) {
  const likedData = await likedRes.json();
  setLiked(likedData.liked);
}

          const portafolioMapeado: PortafolioCompleto = {
            nombre: profileData.nombre,
            correo: profileData.correo,
            foto: profileData.foto,
            profesion: profileData.nombreProfesion || "Profesional",
            biografia: profileData.biografia,
            telefono: profileData.telefono,
            direccion: profileData.direccion,
            enlacePublico: null,
            experienciasLaborales: expRes.ok ? await expRes.json() : [],
            formacionesAcademica: eduRes.ok ? await eduRes.json() : [],
            habilidadesTecnicas: techRes.ok ? await techRes.json() : [],
            habilidadesBlandas: softRes.ok ? await softRes.json() : [],
            proyectos: projRes.ok ? await projRes.json() : [],
            redesSociales: (profileData.redes || []).map((r: any) => ({
              nombreRed: r.nombreRed,
              urlPerfil: r.urlPerfil,
            })),
          };
          setPortafolio(portafolioMapeado);
        } else {
          // --- MODO PRIVADO ---
          const token =
            sessionStorage.getItem("jwt") ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("jwt") ||
            localStorage.getItem("token");

          const response = await fetch(` https://teamsysback.apps.cs.umss.edu.bo/api/portafolio/${id}`, {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });

          if (!response.ok) throw new Error("No se pudo cargar el portafolio.");
          const data = await response.json();
          setPortafolio(data);

          // 🔥 CLAVE: extraer el slug real del enlace público (evita problemas de encoding)
          let slug = null;
          if (data.enlacePublico) {
            slug = extraerSlugDeEnlacePublico(data.enlacePublico);
          }
          if (!slug && data.correo) {
            slug = correoToSlug(data.correo);
          }
          setSlugPrivado(slug);

          // Cargar total de likes usando el slug
if (slug) {
  try {

    const likesTotalRes = await fetch(
      ` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/profile/${slug}/likes/total`
    );

    const likedRes = await fetch(
      ` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/profile/${slug}/liked`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (likesTotalRes.ok) {
      const { totalLikes } = await likesTotalRes.json();
      setTotalLikes(totalLikes);
    }

    if (likedRes.ok) {
      const likedData = await likedRes.json();
      setLiked(likedData.liked);
    }

  } catch (err) {
    console.error("Error al cargar likes", err);
  }
}
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Error al cargar el portafolio.");
      } finally {
        setLoading(false);
      }
    };

    if (identifier) fetchData();
  }, [identifier, isPublicMode]);

  // ==================== MANEJO DE LIKES (usa el slug real) ====================
  const handleLike = async () => {
    let likeIdentifier: string | null = null;
    if (isPublicMode) {
      likeIdentifier = textoUrl!;
    } else {
      // Priorizar el slug extraído del enlace público (el que el backend espera)
      if (slugPrivado) {
        likeIdentifier = slugPrivado;
      } else if (portafolio?.enlacePublico) {
        likeIdentifier = extraerSlugDeEnlacePublico(portafolio.enlacePublico);
      } else if (portafolio?.correo) {
        likeIdentifier = correoToSlug(portafolio.correo);
      }
    }

    if (!likeIdentifier) {
      alert("No se puede dar like: falta el identificador del perfil.");
      return;
    }

    try {
      setProcessingLike(true);
      const url = ` https://teamsysback.apps.cs.umss.edu.bo/api/enlace/profile/${likeIdentifier}/like`;
      const token = !isPublicMode
        ? sessionStorage.getItem("jwt") ||
          sessionStorage.getItem("token") ||
          localStorage.getItem("jwt") ||
          localStorage.getItem("token")
        : undefined;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

if (!response.ok) {
  const errorText = await response.text();
  throw new Error(errorText || "Error al procesar like");
}

const data = await response.json();

if (data.message.includes("registrado")) {

  setLiked(true);

  setTotalLikes((prev) => prev + 1);

  if (!isPublicMode) {
    alert("¡Like registrado!");
  }

} else {

  setLiked(false);

  setTotalLikes((prev) => Math.max(0, prev - 1));

  if (!isPublicMode) {
    alert("Like eliminado");
  }
}


    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Error al registrar like");
    } finally {
      setProcessingLike(false);
    }
  };

  // ==================== RENDERIZADO DE ESTADOS ====================
  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-azul-brillante border-t-transparent"></div>
          <p className="mt-4 text-text-secondary">
            {isPublicMode ? "Cargando portafolio público..." : "Cargando portafolio..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !portafolio) {
    return (
      <div className="mx-auto max-w-xl text-center py-16 px-4">
        <div className="rounded-3xl border border-red-500/20 bg-red-950/20 p-8 backdrop-blur-md">
          <BriefcaseBusiness className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-text-primary">Error al cargar portafolio</h2>
          <p className="mt-2 text-text-secondary">{error || "No se encontró el portafolio solicitado."}</p>
          <button
            onClick={() => navigate(isPublicMode ? "/" : "/dashboard")}
            className="mt-6 rounded-xl bg-brand-azul-brillante px-6 py-2.5 font-semibold text-white hover:opacity-90 transition"
          >
            {isPublicMode ? "Ir al Inicio" : "Volver"}
          </button>
        </div>
      </div>
    );
  }

  const fotoPerfil = portafolio.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const telefonoWhatsapp = portafolio.telefono?.replace(/\D/g, "") || "";

  // ==================== RENDER PRINCIPAL ====================
  return (
    <div className="relative min-h-[calc(100vh-100px)] py-8 px-4 max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Luces decorativas */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-azul-brillante/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-morado/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Botón Volver solo en modo privado */}
      {!isPublicMode && (
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-text-secondary hover:text-brand-azul-brillante transition font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
        </div>
      )}

      {/* Cabecera de Perfil */}
      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-brand-azul-brillante/30 shadow-lg bg-[#0F223D]">
                <img src={fotoPerfil} className="w-full h-full object-cover" alt={portafolio.nombre} />
              </div>
              <button
                onClick={handleLike}
                disabled={processingLike}
                className="mt-3 flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-400 transition disabled:opacity-50"
              >
                <Heart className="w-4 h-4 fill-white" />
                {processingLike
  ? "Procesando..."
  : liked
    ? "Ya no me gusta"
    : "Me gusta"}
              </button>
              <span className="mt-2 text-sm text-text-secondary">{totalLikes} likes</span>
            </div>

            <div className="flex-1">
              {isPublicMode && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent-neon/10 border border-brand-accent-neon/20 px-3 py-0.5 text-xs font-semibold text-brand-accent-neon mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-neon animate-pulse" />
                  Perfil Público Compartido
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">{portafolio.nombre}</h1>
              <p className="text-base sm:text-lg text-brand-azul-brillante font-semibold mt-1">{portafolio.profesion}</p>
              {portafolio.direccion && (
                <p className="text-sm text-text-secondary mt-1 flex items-center justify-center md:justify-start gap-1">
                  <MapPin className="w-4 h-4 text-brand-morado" />
                  {portafolio.direccion}
                </p>
              )}
              {portafolio.biografia && (
                <div
                  className="text-sm sm:text-base text-text-secondary mt-3 max-w-2xl leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: portafolio.biografia }}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
            {portafolio.correo && (
              <a
                href={`mailto:${portafolio.correo}`}
                className="flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#112F58] text-[#E2F0FF] border border-brand-azul-brillante/30 py-2.5 px-5 rounded-xl transition text-sm font-semibold shadow-md"
              >
                <Mail className="w-4 h-4" />
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
                <Phone className="w-4 h-4" />
                Escribir por WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Pestañas de Navegación */}
      <div className="flex border-b border-card-border/80 p-1 bg-card-bg/20 rounded-xl max-w-fit gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "general"
              ? "bg-brand-azul-brillante text-white shadow-md"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Resumen General
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "experience"
              ? "bg-brand-azul-brillante text-white shadow-md"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Experiencia y Skills
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "projects"
              ? "bg-brand-azul-brillante text-white shadow-md"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Proyectos ({portafolio.proyectos.length})
        </button>
        <button
          onClick={() => setActiveTab("education")}
          className={`px-4 sm:px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === "education"
              ? "bg-brand-azul-brillante text-white shadow-md"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          Educación y Enlaces
        </button>
      </div>

      {/* Contenido de Pestañas */}
      <div className="flex-1 space-y-6">
        {/* ========== PESTAÑA GENERAL ========== */}
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Sobre Mí</h3>
                {portafolio.biografia ? (
                  <div
                    className="text-sm sm:text-base text-text-secondary leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: portafolio.biografia }}
                  />
                ) : (
                  <p className="text-sm text-text-secondary">El profesional no ha ingresado una descripción biográfica por el momento.</p>
                )}
              </div>
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
                        {red.nombreRed === "LinkedIn" && <Linkedin className="w-4 h-4 text-brand-azul-brillante" />}
                        {red.nombreRed === "Twitter" && <Twitter className="w-4 h-4 text-brand-azul-brillante" />}
                        {red.nombreRed === "GitHub" && <Github className="w-4 h-4 text-brand-azul-brillante" />}
                        {!["LinkedIn", "Twitter", "GitHub"].includes(red.nombreRed) && (
                          <Globe className="w-4 h-4 text-brand-azul-brillante" />
                        )}
                        <span className="text-brand-azul-brillante font-semibold">{red.nombreRed}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-text-secondary" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-secondary">Sin enlaces adicionales disponibles.</p>
                )}
              </div>
            </div>

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

        {/* ========== PESTAÑA EXPERIENCIA Y SKILLS ========== */}
        {activeTab === "experience" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-6">Trayectoria Profesional</h3>
                {portafolio.experienciasLaborales.length > 0 ? (
                  <div className="relative border-l border-brand-azul-brillante/30 ml-4 space-y-8">
                    {portafolio.experienciasLaborales.map((exp, index) => (
                      <div key={index} className="relative pl-6">
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
                          <p className="mt-3 text-sm text-text-secondary leading-relaxed whitespace-pre-line">{exp.descripcionProyecto}</p>
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
                                <FileText className="w-4 h-4" />
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

            <div className="space-y-6">
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
                          <span className="text-[10px] text-brand-morado font-medium uppercase tracking-wider block mb-1">{skill.categoria}</span>
                        )}
                        {skill.anosExperiencia !== undefined && skill.anosExperiencia > 0 && (
                          <p className="text-xs text-text-secondary">
                            {skill.anosExperiencia} {skill.anosExperiencia === 1 ? "año" : "años"} de experiencia
                          </p>
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

        {/* ========== PESTAÑA PROYECTOS ========== */}
        {activeTab === "projects" && (
          <div>
            {portafolio.proyectos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...portafolio.proyectos]
  .sort((a, b) => Number(b.destacar) - Number(a.destacar))
  .map((pro, index) => (
                  <article
                    key={index}
                    className="bg-card-bg/50 backdrop-blur-sm border border-card-border rounded-2xl overflow-hidden hover:border-brand-azul-brillante/30 transition flex flex-col h-full shadow-lg"
                  >
                    <div className="h-48 overflow-hidden bg-[#0A1A2F] relative border-b border-card-border">
                      {pro.urlsImagenes && pro.urlsImagenes.length > 0 ? (
                        <img
                          src={pro.urlsImagenes[0]}
                          alt={pro.titulo}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4">
                          <BriefcaseBusiness size={56} className="text-brand-azul-brillante mb-3" />
                          <span className="text-white font-semibold text-center line-clamp-2">{pro.titulo}</span>
                        </div>
                      )}
                      <span className="absolute bottom-3 right-3 bg-brand-azul-brillante/95 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                        {pro.estadoProyecto || "Terminado"}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1 gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-text-primary tracking-tight">
                          {pro.titulo}</h4>
                        <p className="text-xs text-brand-morado font-semibold uppercase tracking-wider mt-0.5">
                          {pro.rolProyecto}</p>

 {pro.destacar && (
  <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-extrabold shadow-lg">
    ★ Destacado
  </div>
)}
                        {pro.fechaInicio && (
                          <p className="text-[11px] text-text-secondary mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {pro.fechaInicio} — {pro.fechaFinalizacion || "Presente"}
                          </p>
                        )}
                      </div>

                      {pro.descripcion && (
                        <div
                          className="text-sm sm:text-base text-text-secondary [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1"
                          dangerouslySetInnerHTML={{ __html: pro.descripcion }}
                        />
                      )}

                      {pro.tecnologias && pro.tecnologias.length > 0 && (
                        <div className="mt-4">
                          <p className="text-text-secondary text-sm font-semibold mb-3 flex items-center gap-1">
                            <Code2 className="w-4 h-4" /> Tecnologías usadas
                          </p>
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
                        </div>
                      )}

                      {pro.urlsImagenes && pro.urlsImagenes.length > 0 && (
                        <div className="mt-4">
                          <p className="text-text-secondary text-sm font-semibold mb-3 flex items-center gap-1">
                            <ImageIcon className="w-4 h-4" /> Imágenes del proyecto
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {pro.urlsImagenes.map((imagenUrl, idx) => (
                              <button
                                key={`${imagenUrl}-${idx}`}
                                type="button"
                                onClick={() => window.open(imagenUrl, "_blank")}
                                className="w-full rounded-xl bg-[#2b7ae7] border border-card-border px-3 py-2 text-sm text-text-primary hover:border-brand-azul-brillante hover:bg-[#122947] transition"
                              >
                                Imagen {idx + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {pro.urlPdfs && pro.urlPdfs.length > 0 && (
                        <div className="mt-4">
                          <p className="text-text-secondary text-sm font-semibold mb-3 flex items-center gap-1">
                            <FileText className="w-4 h-4" /> PDFs del proyecto
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {pro.urlPdfs.map((pdfUrl, idx) => (
                              <a
                                key={`${pdfUrl}-${idx}`}
                                href={pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full rounded-xl bg-[#2b7ae7] border border-card-border px-3 py-2 text-sm text-text-primary text-center hover:border-brand-azul-brillante hover:bg-[#122947] transition"
                              >
                                📄 PDF {idx + 1}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 border-t border-card-border/40 mt-auto">
                        <p className="text-text-secondary text-sm font-semibold mb-3">Enlaces del proyecto</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          {pro.enlaceGithub && (
                            <a
                              href={pro.enlaceGithub}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-text-primary hover:text-brand-azul-brillante font-semibold transition"
                            >
                              <Github size={16} />
                              GitHub
                            </a>
                          )}
                          {pro.enlaceDemo && (
                            <a
                              href={pro.enlaceDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-text-primary hover:text-brand-azul-brillante font-semibold transition"
                            >
                              <ExternalLink size={16} />
                              Demo En Vivo
                            </a>
                          )}
                          {pro.urlsAdicionales?.map((url, idx) => (
                            <a
                              key={`${url}-${idx}`}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-[#0B1F3A] border border-brand-azul-brillante/15 hover:border-brand-azul-brillante text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
                            >
                              <ExternalLink size={16} />
                              Link {idx + 1}
                            </a>
                          ))}
                        </div>
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

        {/* ========== PESTAÑA EDUCACIÓN Y ENLACES ========== */}
        {activeTab === "education" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-6">Educación y Formación</h3>
                {portafolio.formacionesAcademica.length > 0 ? (
                  <div className="relative border-l border-brand-morado/30 ml-4 space-y-8">
                    {portafolio.formacionesAcademica.map((form, index) => (
                      <div key={index} className="relative pl-6">
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
                            <p className="mt-3 text-sm text-text-secondary leading-relaxed whitespace-pre-line">{form.descripcion}</p>
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

            <div className="space-y-6">
              <div className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-text-primary border-b border-card-border/50 pb-3 mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-azul-brillante/10 rounded-xl flex items-center justify-center text-brand-azul-brillante shrink-0">
                      <Mail className="w-5 h-5" />
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
                        <Phone className="w-5 h-5" />
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
                        <LinkIcon className="w-5 h-5" />
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