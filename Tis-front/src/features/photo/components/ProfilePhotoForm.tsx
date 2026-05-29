import { useNavigate } from 'react-router-dom';
import { useProfilePhoto } from '../hooks/useProfilePhoto';

export const ProfilePhotoForm = () => {
  const navigate = useNavigate();

  const {
    perfilData,
    previewUrl,
    selectedFile,
    isLoadingPerfil,
    isUploading,
    serverError,
    handleFileChange,
    handleUploadPhoto,
    handleCancel,
  } = useProfilePhoto();

  const DEFAULT_AVATAR =
    'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  const handleCancelAndGoProfile = () => {
    handleCancel();
    navigate('/profile');
  };
  const handleSaveAndGoProfile = async () => {
  await handleUploadPhoto();

  setTimeout(() => {
    navigate('/profile');
  }, 1000);
};

  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-10 bg-brand-azul-profundo/40 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="px-6 py-4 border-b border-white/10 flex items-center bg-brand-azul-profundo rounded-t-[24px]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#64ffda] shadow-md">
            <img
              src={previewUrl || DEFAULT_AVATAR}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#64ffda]">Foto de Perfil</h2>
            <p className="text-sm text-[#9CA3AF]">
              Sube una imagen y se guardará en Cloudinary
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {serverError && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium">
            {serverError}
          </div>
        )}

        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center text-[#E5E7EB]">
            <span className="w-2 h-2 bg-[#3B82F6] rounded-full mr-2"></span>
            Subir Imagen
          </h3>

          <div className="flex flex-col items-center gap-5">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 bg-[#0F223D] shadow-lg">
              <img
                src={previewUrl || DEFAULT_AVATAR}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <p className="text-[#E5E7EB] text-sm font-medium">
                {perfilData?.nombre
                  ? `Usuario: ${perfilData.nombre}`
                  : 'Selecciona una nueva foto'}
              </p>
              <p className="text-[#9CA3AF] text-xs mt-1">
                Formatos permitidos: JPG y PNG. Tamaño máximo: 1MB.
              </p>
            </div>

            <label className="px-6 py-2 border border-[#3B82F6] text-[#E5E7EB] rounded-xl hover:bg-[#3B82F6]/10 transition-colors cursor-pointer font-medium">
              Seleccionar Imagen
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </section>

        <div className="flex flex-col md:flex-row md:justify-end space-y-3 md:space-y-0 md:space-x-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleCancelAndGoProfile}
            className="px-6 py-2 border border-[#4ADE80] text-[#4ADE80] rounded hover:bg-[#4ADE80]/10 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSaveAndGoProfile}
            disabled={!selectedFile || isUploading || isLoadingPerfil}
            className={`px-6 py-2 rounded shadow-lg font-bold transition-colors ${
              !selectedFile || isUploading || isLoadingPerfil
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-[#3B82F6] text-white hover:opacity-90'
            }`}
          >
            {isUploading ? 'Subiendo...' : 'Guardar Foto'}
          </button>
        </div>
      </div>
    </div>
  );
};