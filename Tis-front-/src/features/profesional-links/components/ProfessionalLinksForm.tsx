import { useEffect } from 'react';
import { useProfessionalLinks } from '../hooks/useProfessionalLinks';
import type { RedSocialResponseDTO } from '../services/professional-links.dto';

interface Props {
  selectedLink: RedSocialResponseDTO | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const ProfessionalLinksForm = ({
  selectedLink,
  onCancel,
  onSuccess,
}: Props) => {
  const {
    form,
    isLoading,
    isLoadingLinks,
    serverError,
    submitSingleLink,
  } = useProfessionalLinks();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (selectedLink) {
      reset({
        nombreRed: selectedLink.nombreRed as 'LinkedIn' | 'GitHub',
        urlPerfil: selectedLink.urlPerfil,
        esPublico: selectedLink.esPublico,
      });
    } else {
      reset({
        nombreRed: 'LinkedIn',
        urlPerfil: '',
        esPublico: true,
      });
    }
  }, [selectedLink, reset]);

  const selectedNetwork = watch('nombreRed') || 'LinkedIn';
  const isLinkedIn = selectedNetwork === 'LinkedIn';

  const onSubmit = handleSubmit(async (data) => {
    const ok = await submitSingleLink(data, selectedLink?.idRed);

    if (ok) {
      onSuccess();
    }
  });

  return (
    <div className="w-full text-white">
      <div className="w-full overflow-hidden rounded-[20px] md:rounded-[28px] border border-[#163154] bg-[#061A31] shadow-lg">
        
        {/* Header */}
        <div className="border-b border-[#163154] px-4 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-[#23E7C8] text-[#23E7C8] flex-shrink-0">
              🔗
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#23E7C8]">
                Redes profesionales
              </h1>

              <p className="mt-1 text-xs sm:text-sm md:text-base text-[#C3CBD8]">
                Agrega tus perfiles profesionales para que otros puedan conocer
                más sobre ti.
              </p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={onSubmit}
          className="p-4 sm:p-6 md:p-8"
        >
          {serverError && (
            <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {serverError}
            </div>
          )}

          {isLoadingLinks && (
            <div className="mb-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#E5E7EB]">
              Cargando redes profesionales...
            </div>
          )}

          <section className="rounded-[18px] md:rounded-[22px] border border-[#163154] bg-[#0A2240] p-4 sm:p-6 md:p-8">
            
            <h2 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
              {selectedLink ? 'Editar enlace' : 'Nuevo enlace'}
            </h2>

            <p className="mt-2 text-sm md:text-base text-[#9CA3AF]">
              {selectedLink
                ? 'Solo puedes actualizar la URL del enlace seleccionado.'
                : 'Agrega y gestiona los enlaces a tus redes profesionales.'}
            </p>

            <div className="mt-8">
              
              {/* Información de red */}
              <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                
                <div
                  className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl text-white shadow-md flex-shrink-0 ${
                    isLinkedIn ? 'bg-[#0A66C2]' : 'bg-[#111827]'
                  }`}
                >
                  {isLinkedIn ? (
                    <span className="text-xl sm:text-2xl font-bold">
                      in
                    </span>
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold">
                      GH
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xl sm:text-2xl font-semibold text-white break-words">
                    {selectedNetwork}
                  </p>

                  <p className="text-sm sm:text-base text-[#C3CBD8]">
                    Enlace a tu perfil profesional
                  </p>
                </div>
              </div>

              {/* Campos */}
              <div className="space-y-5">
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Tipo de red <span className="text-red-400">*</span>
                  </label>

                  <select
                    {...register('nombreRed')}
                    disabled={!!selectedLink}
                    className={`w-full rounded-xl border border-[#2563EB] bg-[#071A30] px-4 py-3 sm:py-4 text-white outline-none focus:border-[#3B82F6] ${
                      selectedLink
                        ? 'cursor-not-allowed opacity-70'
                        : ''
                    }`}
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                  </select>

                  {selectedLink && (
                    <p className="mt-2 text-sm text-[#AEB7C6]">
                      El tipo de red no se puede cambiar al editar.
                      Solo puedes actualizar el enlace.
                    </p>
                  )}

                  {errors.nombreRed?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {String(errors.nombreRed.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    URL del perfil <span className="text-red-400">*</span>
                  </label>

                  <input
                    type="url"
                    placeholder={
                      isLinkedIn
                        ? 'https://www.linkedin.com/in/juanperez'
                        : 'https://github.com/juanperez'
                    }
                    {...register('urlPerfil')}
                    className="w-full rounded-xl border border-[#2563EB] bg-[#071A30] px-4 py-3 sm:py-4 text-white outline-none placeholder:text-[#AEB7C6] focus:border-[#3B82F6]"
                  />

                  {errors.urlPerfil?.message ? (
                    <p className="mt-2 text-sm text-red-400">
                      {String(errors.urlPerfil.message)}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-[#AEB7C6]">
                      {isLinkedIn
                        ? 'Solo se permite un enlace de LinkedIn.'
                        : 'Solo se permite un enlace de GitHub.'}
                    </p>
                  )}
                </div>

                <div className="flex items-start sm:items-center gap-3 rounded-xl border border-[#163154] bg-[#071A30] px-4 py-4">
                  <input
                    id="esPublico"
                    type="checkbox"
                    {...register('esPublico')}
                    className="h-5 w-5 cursor-pointer flex-shrink-0"
                  />

                  <label
                    htmlFor="esPublico"
                    className="cursor-pointer text-sm text-white leading-relaxed"
                  >
                    Mostrar este enlace como público
                  </label>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="mt-8 border-t border-[#163154] pt-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="w-full sm:w-auto rounded-xl border border-[#1E3A5F] bg-transparent px-5 py-3 font-medium text-[#E5E7EB] transition hover:bg-[#1E3A5F]/30 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full sm:w-auto rounded-xl px-8 py-3 font-semibold text-white transition ${
                    isLoading
                      ? 'cursor-not-allowed bg-gray-500 opacity-70'
                      : 'bg-brand-azul-brillante hover:opacity-90 shadow-lg'
                  }`}
                >
                  {isLoading
                    ? 'Guardando...'
                    : selectedLink
                      ? 'Actualizar enlace'
                      : 'Guardar enlace'}
                </button>

              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};