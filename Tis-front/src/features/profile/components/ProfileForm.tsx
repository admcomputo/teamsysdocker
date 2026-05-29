import { useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { profileService } from '../services/profile.service';
import type { PerfilBackendResponse, Profesion } from '../models/profile.model';

const normalizarDisponibilidad = (
  value?: string | null,
): 'Disponible' | 'No disponible' => {
  return value === 'No disponible' ? 'No disponible' : 'Disponible';
};

interface ProfileFormProps {
  onProfileUpdated?: () => void;
}

export const ProfileForm = ({ onProfileUpdated }: ProfileFormProps) => {
  const { form, isLoading, serverError, onSubmit, onCancel } =
    useProfile(onProfileUpdated);

  const {
    register,
    reset,
    formState: { errors },
  } = form;

  const [profesiones, setProfesiones] = useState<Profesion[]>([]);
  const [loadingProfesiones, setLoadingProfesiones] = useState(false);
  const [perfilData, setPerfilData] = useState<PerfilBackendResponse | null>(null);
  const [loadingPerfil, setLoadingPerfil] = useState(false);

  useEffect(() => {
    const cargarProfesiones = async () => {
      try {
        setLoadingProfesiones(true);
        const data = await profileService.getProfesiones();
        setProfesiones(data);
      } catch (error) {
        console.error('Error al cargar profesiones:', error);
      } finally {
        setLoadingProfesiones(false);
      }
    };

    cargarProfesiones();
  }, []);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setLoadingPerfil(true);
        const data = await profileService.getProfile();
        setPerfilData(data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoadingPerfil(false);
      }
    };

    cargarPerfil();
  }, []);

  useEffect(() => {
    if (!perfilData) return;

    const profesionSeleccionada = profesiones.find(
      (profesion) => profesion.idProfesion === perfilData.idProfesion
    );

    reset({
      fullName: perfilData.nombre ?? '',
      profession: profesionSeleccionada?.nombreProfesion ?? '',
      bio: perfilData.biografia ?? '',
      telefono: perfilData.telefono ?? '',
      direccion: perfilData.direccion ?? '',
      disponibilidad: normalizarDisponibilidad(perfilData.disponibilidad),
    });
  }, [perfilData, profesiones, reset]);

  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-brand-azul-profundo rounded-t-2xl">
        <h2 className="text-xl font-bold text-[#64ffda]">
          Configuración del Perfil
        </h2>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-8">
        {serverError && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium">
            {serverError}
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#64ffda] bg-[#0F223D]">
            <img
              src={
                perfilData?.foto ||
                'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg text-white font-semibold">
              {loadingPerfil ? 'Cargando perfil...' : perfilData?.nombre || ''}
            </h3>

            <p className="text-sm text-[#9CA3AF]">
              {perfilData?.correo || ''}
            </p>
          </div>
        </div>

        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center text-[#E5E7EB]">
            <span className="w-2 h-2 bg-[#3B82F6] rounded-full mr-2"></span>
            Información Básica
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre Completo"
              placeholder="Juan Pérez"
              {...register('fullName')}
              error={errors.fullName?.message}
              autoComplete="name"
              className="bg-[#0F223D] border-white/10 focus:border-[#3B82F6] text-[#E5E7EB]"
            />

            <div>
              <label className="block text-sm text-[#9CA3AF] mb-2">
                Profesión / Título
              </label>

              <select
                {...register('profession')}
                className="w-full bg-[#0F223D] border border-white/10 rounded px-4 py-2 focus:border-[#3B82F6] outline-none text-[#E5E7EB]"
                disabled={loadingProfesiones}
              >
                <option value="">
                  {loadingProfesiones
                    ? 'Cargando profesiones...'
                    : 'Selecciona una opción'}
                </option>

                {profesiones.map((profesion) => (
                  <option
                    key={profesion.idProfesion}
                    value={profesion.nombreProfesion}
                  >
                    {profesion.nombreProfesion}
                  </option>
                ))}
              </select>

              {errors.profession?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.profession.message}
                </p>
              )}
            </div>

            <Input
              label="Teléfono"
              placeholder="77498561"
              {...register('telefono')}
              error={errors.telefono?.message}
              autoComplete="tel"
              className="bg-[#0F223D] border-white/10 focus:border-[#3B82F6] text-[#E5E7EB]"
            />

            <Input
              label="Dirección"
              placeholder="Tiquipaya calle los lirios "
              {...register('direccion')}
              error={errors.direccion?.message}
              autoComplete="street-address"
              className="bg-[#0F223D] border-white/10 focus:border-[#3B82F6] text-[#E5E7EB]"
            />
            <div className="md:col-span-2">
  <label className="block text-sm text-[#9CA3AF] mb-2">
    Disponibilidad laboral
  </label>

  <select
    {...register('disponibilidad')}
    className="w-full bg-[#0F223D] border border-white/10 rounded px-4 py-2 focus:border-[#3B82F6] outline-none text-[#E5E7EB]"
  >
    <option value="Disponible">Disponible</option>
    <option value="No disponible">No disponible</option>
  </select>

  <p className="mt-2 text-xs text-[#9CA3AF]">
    Indica si estás disponible para recibir propuestas laborales.
  </p>
</div>


            <div className="md:col-span-2">
              <label className="block text-sm text-[#9CA3AF] mb-2">
                Biografía Profesional
              </label>

              <textarea
                rows={4}
                placeholder="Describe tu experiencia y metas..."
                {...register('bio')}
                className="w-full bg-[#0F223D] border border-white/10 rounded px-4 py-2 focus:border-[#3B82F6] outline-none text-[#E5E7EB] resize-none"
              />

              {errors.bio?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row md:justify-end space-y-3 md:space-y-0 md:space-x-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-[#4ADE80] text-[#4ADE80] rounded hover:bg-[#4ADE80]/10 transition-colors"
          >
            Cancelar
          </button>

          <Button
            type="submit"
            className="px-6 py-2 bg-[#3B82F6] text-white rounded hover:opacity-90 shadow-lg font-bold"
            isLoading={isLoading}
            size="lg"
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};