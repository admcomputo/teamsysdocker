import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@shared/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { professionalLinksService } from '../services/professional-links.service';
import type { RedSocialResponseDTO } from '../services/professional-links.dto';
import {
  professionalLinksSchema,
  type ProfessionalLinksFormData,
} from '../utils/validation';

export const useProfessionalLinks = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ProfessionalLinksFormData>({
    resolver: zodResolver(professionalLinksSchema),
    defaultValues: {
      nombreRed: 'LinkedIn',
      urlPerfil: '',
      esPublico: true,
    },
    mode: 'onSubmit',
  });

  const { handleSubmit } = form;

  const loadProfessionalLinks = async (): Promise<RedSocialResponseDTO[]> => {
    try {
      setIsLoadingLinks(true);
      setServerError(null);

      const response = await professionalLinksService.getProfessionalLinks();
      return response.data ?? [];
    } catch (error) {
      console.error(error);
      setServerError('No se pudieron cargar tus redes profesionales.');
      return [];
    } finally {
      setIsLoadingLinks(false);
    }
  };

  const submitSingleLink = async (
    data: ProfessionalLinksFormData,
    idRed?: number
  ) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const currentLinks = await loadProfessionalLinks();

      const duplicated = currentLinks.some(
        (item) =>
          item.nombreRed.trim().toLowerCase() ===
            data.nombreRed.trim().toLowerCase() &&
          item.idRed !== idRed
      );

      if (duplicated) {
        const msg = `Ya tienes registrado un enlace de tipo ${data.nombreRed}.`;
        setServerError(msg);
        showToast(msg, 'error');
        return false;
      }

      const payload = {
        nombreRed: data.nombreRed,
        urlPerfil: data.urlPerfil.trim(),
        esPublico: data.esPublico,
      };

      if (idRed) {
        await professionalLinksService.updateProfessionalLink(idRed, payload);
      } else {
        await professionalLinksService.createProfessionalLinks([payload]);
      }

      showToast(
        idRed
          ? 'Enlace actualizado correctamente.'
          : 'Enlace creado correctamente.',
        'success'
      );

      return true;
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado.';

      setServerError(msg);
      showToast(msg, 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = async (data: ProfessionalLinksFormData) => {
    const ok = await submitSingleLink(data);

    if (ok) {
      form.reset({
        nombreRed: 'LinkedIn',
        urlPerfil: '',
        esPublico: true,
      });

      navigate('/professional-links');
    }
  };

  const deleteLink = async (idRed: number) => {
    try {
      setIsLoading(true);

      await professionalLinksService.deleteProfessionalLink(idRed);

      showToast('Enlace eliminado correctamente.', 'success');
      return true;
    } catch (error) {
      console.error(error);
      showToast('No se pudo eliminar el enlace.', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => navigate('/professional-links');

  return {
    form,
    isLoading,
    isLoadingLinks,
    serverError,
    deleteLink,
    loadProfessionalLinks,
    submitSingleLink,
    onCancel,
    onSubmit: handleSubmit(submitForm),
  };
};