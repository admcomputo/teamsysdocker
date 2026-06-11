import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../utils/validation';
import type { ProfileFormData } from '../utils/validation';
import { profileService } from '../services/profile.service';
import { profileAdapter } from '../services/profile.adapter';
import { useToast } from '@shared/hooks/useToast';

const normalizarDisponibilidad = (
  value?: string,
): 'Disponible' | 'No disponible' => {
  return value === 'No disponible' ? 'No disponible' : 'Disponible';
};

const storedProfile = profileService.getProfileLocal();

export const useProfile = (onProfileUpdated?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { showToast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: storedProfile?.fullName || '',
      profession: storedProfile?.profession || '',
      bio: storedProfile?.bio || '',
      telefono: storedProfile?.telefono || '',
      direccion: storedProfile?.direccion || '',
      disponibilidad: normalizarDisponibilidad(storedProfile?.disponibilidad),
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const dto = profileAdapter(data);
      const response = await profileService.updateProfile(dto);

      if (response.success) {
        showToast(response.message || 'Perfil actualizado correctamente', 'success');

        if (onProfileUpdated) {
          onProfileUpdated();
        }
      } else {
        const msg = response.message || 'No se pudo actualizar el perfil';
        setServerError(msg);
        showToast(msg, 'error');
      }
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado. Por favor intenta de nuevo.';

      setServerError(msg);
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };



  return {
    form,
    isLoading,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
  };
};