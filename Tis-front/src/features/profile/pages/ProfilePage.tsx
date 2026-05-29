import { ProfileForm } from "../components/ProfileForm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfessionalLinksPage } from "../../profesional-links/pages/ProfessionalLinksPage";
import { useProfilePhoto } from "../../photo/hooks/useProfilePhoto";
import { profileService } from "../services/profile.service";
import type { PerfilBackendResponse, Profesion } from "../models/profile.model";

export const ProfilePage = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [perfil, setPerfil] = useState<PerfilBackendResponse | null>(null);
  const [profesiones, setProfesiones] = useState<Profesion[]>([]);
  const [loadingPerfil, setLoadingPerfil] = useState(false);

  const { previewUrl, isLoadingPerfil } = useProfilePhoto();

  const handleEditProfile = () => {
    setShowProfileForm(true);
  };

  const cargarDatos = async () => {
    try {
      setLoadingPerfil(true);

      const [perfilData, profesionesData, ] = await Promise.all([
        profileService.getProfile(),
        profileService.getProfesiones(),
      ]);

      setPerfil(perfilData);
      setProfesiones(profesionesData);
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoadingPerfil(false);
    }
  };

  const recargarPerfil = async () => {
    try {
      setLoadingPerfil(true);

      const perfilData = await profileService.getProfile();
      setPerfil(perfilData);
    } catch (error) {
      console.error("Error al recargar perfil:", error);
    } finally {
      setLoadingPerfil(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const profesionActual =
    profesiones.find((p) => p.idProfesion === perfil?.idProfesion)
      ?.nombreProfesion || "";

  const fotoPerfil =
    previewUrl ||
    perfil?.foto ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const telefonoLimpio = perfil?.telefono?.replace(/\D/g, "") || "";
  const telefonoWhatsapp = telefonoLimpio.startsWith("591")
    ? telefonoLimpio
    : `591${telefonoLimpio}`;

  return (
    <div className="relative min-h-[calc(100vh-100px)] py-8 px-4 max-w-5xl mx-auto flex flex-col gap-8">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-azul-brillante/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-morado/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold text-text-primary">Mi Perfil</h1>
        <p className="text-text-secondary mt-2">
          Gestiona tu información personal, habilidades y proyectos desde aquí.
        </p>
      </div>

      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          <Link to="/photo" className="relative group mx-auto md:mx-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-brand-morado/40 shadow-lg bg-[#0F223D] flex items-center justify-center">
              {isLoadingPerfil || loadingPerfil ? (
                <span className="text-white text-sm">Cargando...</span>
              ) : (
                <img
                  src={fotoPerfil}
                  className="w-full h-full object-cover"
                  alt="Foto de perfil"
                />
              )}
            </div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                Cambiar foto
              </span>
            </div>
          </Link>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {loadingPerfil ? "Cargando..." : perfil?.nombre}
            </h1>

            {profesionActual && (
              <p className="text-base sm:text-lg text-brand-morado mt-1">
                {profesionActual}
              </p>
            )}

            {perfil?.biografia && (
              <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-xl mx-auto md:mx-0">
                {perfil.biografia}
              </p>
            )}

            <div className="mt-3 text-sm text-text-secondary space-y-1">
              {perfil?.correo && (
                <p>
                  Correo:{" "}
                  <a
                    href={`mailto:${perfil.correo}`}
                    className="text-brand-azul-brillante hover:underline"
                  >
                    {perfil.correo}
                  </a>
                </p>
              )}

              {perfil?.telefono && telefonoLimpio && (
                <p>
                  Teléfono:{" "}
                  <a
                    href={`https://wa.me/${telefonoWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline"
                  >
                    {perfil.telefono}
                  </a>
                </p>
              )}

              {perfil?.direccion && <p>Dirección: {perfil.direccion}</p>}
            </div>
          </div>

          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <button
              onClick={handleEditProfile}
              className="bg-brand-azul-brillante hover:opacity-90 text-white w-full md:w-auto px-5 sm:px-6 py-3 rounded-xl shadow-lg whitespace-nowrap"
            >
              Editar perfil
            </button>
          </div>
        </div>
      </section>

      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <ProfessionalLinksPage />
        </div>
      </section>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
        <Link
          to="/hardskills"
          className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-brand-morado/50 transition-colors group flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-brand-morado/10 rounded-xl flex items-center justify-center text-brand-morado group-hover:scale-110 transition-transform shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Skills Técnicos
            </h3>
            <p className="text-text-secondary text-sm">
              Gestiona tus habilidades duras
            </p>
          </div>
        </Link>

        <Link
          to="/softskills"
          className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-brand-azul-brillante/50 transition-colors group flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-brand-azul-brillante/10 rounded-xl flex items-center justify-center text-brand-azul-brillante group-hover:scale-110 transition-transform shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Skills Blandos
            </h3>
            <p className="text-text-secondary text-sm">
              Gestiona tus habilidades interpersonales
            </p>
          </div>
        </Link>

        <Link
          to="/projects"
          className="bg-card-bg/50 backdrop-blur-sm border border-card-border p-5 rounded-2xl hover:border-[#10B981]/50 transition-colors group flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform shrink-0">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Mis Proyectos
            </h3>
            <p className="text-text-secondary text-sm">
              Administra tus portafolios y proyectos
            </p>
          </div>
        </Link>
      </div>

      {showProfileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px]">
            <button
              type="button"
              onClick={() => setShowProfileForm(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 transition font-bold"
            >
              ✕
            </button>

            <ProfileForm
              onProfileUpdated={() => {
                recargarPerfil();
                setShowProfileForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};