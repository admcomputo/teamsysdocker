import { ProfileForm } from "../components/ProfileForm";
import { Link } from "react-router-dom";import { useEffect, useState } from "react";
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
    <div className="relative min-h-[calc(100vh-100px)] w-full max-w-6xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6 overflow-x-hidden">      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-morado/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold text-text-primary">Mi Perfil</h1>
        <p className="text-text-secondary mt-2">
          Gestiona tu información personal, habilidades y proyectos desde aquí.
        </p>
      </div>

      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-5 md:gap-8 items-start"><Link
  to="/photo"
  className="relative group flex justify-center lg:justify-start"
>
            <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-brand-morado/40 shadow-lg bg-[#0F223D] flex items-center justify-center">              {isLoadingPerfil || loadingPerfil ? (
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

            <div className="flex-1 text-center lg:text-left">            
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary break-words">              {loadingPerfil ? "Cargando..." : perfil?.nombre}
            </h1>

            {profesionActual && (
              <p className="text-base sm:text-lg text-brand-morado mt-1">
                {profesionActual}
              </p>
            )}

{perfil?.biografia && (
  <div

      className="
      text-sm sm:text-base
      text-text-secondary
      mt-4
      max-w-2xl
      mx-auto
      lg:mx-0
      break-words
      overflow-hidden
      [&_ul]:list-disc [&_ul]:pl-6
      [&_ol]:list-decimal [&_ol]:pl-6
      [&_li]:mb-1
      "
    dangerouslySetInnerHTML={{
      __html: perfil.biografia,
    }}
  />
)}

          <div className="mt-3 text-xs sm:text-sm text-text-secondary space-y-2 break-all">              {perfil?.correo && (
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

          <div className="w-full lg:w-auto flex justify-center lg:justify-end">              <button
              onClick={handleEditProfile}
className="
bg-brand-azul-brillante
hover:opacity-90
text-white
px-5
py-3
rounded-xl
shadow-lg
transition
w-full
sm:w-auto
text-sm
sm:text-base
font-semibold
">
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

      {showProfileForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-5">
          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl">
<ProfileForm
  onProfileUpdated={() => {
    recargarPerfil();
    setShowProfileForm(false);
  }}
  onCancel={() => setShowProfileForm(false)}
/>
          </div>
        </div>
      )}
    </div>
  );
};