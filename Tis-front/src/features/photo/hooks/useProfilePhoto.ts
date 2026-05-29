import { useEffect, useState, type ChangeEvent } from 'react';
import { useToast } from '@shared/hooks/useToast';
import { photoService } from '../services/photo.service';
import type { UpdatePhotoRequestDto } from '../services/photo.dto';

export const useProfilePhoto = () => {
  const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const [perfilData, setPerfilData] = useState<{
  nombre?: string | null;
  foto?: string | null;
  fotoPerfil?: string | null;
} | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_AVATAR);
  const [isLoadingPerfil, setIsLoadingPerfil] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { showToast } = useToast();

  const MAX_SIZE = 1 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setIsLoadingPerfil(true);
        setServerError(null);

        const data = await photoService.getProfilePhoto();
        console.log('PERFIL FOTO:', data);

        setPerfilData(data);
        setPreviewUrl(data.foto ||  DEFAULT_AVATAR);
      } catch (error) {
        console.error('Error al cargar la foto de perfil:', error);
        setPreviewUrl(DEFAULT_AVATAR);
        setServerError('No se pudo cargar la información de la foto.');
      } finally {
        setIsLoadingPerfil(false);
      }
    };

    cargarPerfil();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setServerError(null);

    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      const msg = 'Formato no permitido. Usa JPG o PNG.';
      setServerError(msg);
      showToast(msg, 'error');
      return;
    }

    if (file.size > MAX_SIZE) {
      const msg = 'La imagen supera 1MB.';
      setServerError(msg);
      showToast(msg, 'error');
      return;
    }

    if (previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUploadPhoto = async () => {
    try {
      setServerError(null);

      if (!selectedFile) {
        const msg = 'Selecciona una imagen primero.';
        setServerError(msg);
        showToast(msg, 'error');
        return;
      }

      setIsUploading(true);

      const imageUrl = await photoService.uploadToCloudinary(selectedFile);

        const response = await photoService.updateProfilePhoto({
          fotoPerfil: imageUrl,
        } as UpdatePhotoRequestDto);

      setPerfilData((prev) => ({
        ...prev,
        foto: imageUrl,
        fotoPerfil: imageUrl,
      }));

      setPreviewUrl(imageUrl);
window.dispatchEvent(new Event('profileUpdated'));
setSelectedFile(null);

      showToast(response.message || 'Foto de perfil actualizada correctamente.', 'success');
    } catch (error) {
      console.error('Error al actualizar foto:', error);

      const msg =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al actualizar la foto.';

      setServerError(msg);
      showToast(msg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setServerError(null);
    setPreviewUrl(perfilData?.foto || perfilData?.fotoPerfil || DEFAULT_AVATAR);
  };

  return {
    perfilData,
    previewUrl,
    selectedFile,
    isLoadingPerfil,
    isUploading,
    serverError,
    handleFileChange,
    handleUploadPhoto,
    handleCancel,
  };
};