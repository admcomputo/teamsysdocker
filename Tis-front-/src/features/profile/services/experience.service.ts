import type {
  Experience,
  ExperienceFormData,
  Technology,
} from '../models/experience.model';

import type {
  CreateExperienceResponseDto,
  ExperienceDto,
  TechnologiesResponseDto,
} from './experience.dto';

import {
  adaptExperience,
  adaptExperiences,
  adaptExperienceToCreateDto,
  adaptTechnologies,
} from './experience.adapter';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('jwt');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getTechnologies = async (): Promise<Technology[]> => {
  const response = await fetch(`${API_URL}/api/tecnologias`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudieron obtener las tecnologías.');
  }

  const data = (await response.json()) as TechnologiesResponseDto;
  return adaptTechnologies(data.data);
};

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await fetch(`${API_URL}/api/experiencias/mis-experiencias`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudieron obtener las experiencias.');
  }

  const data = (await response.json()) as ExperienceDto[];
  return adaptExperiences(data);
};

export const createExperience = async (
  formData: ExperienceFormData,
): Promise<{
  message: string;
  data: Experience;
}> => {
  const payload = adaptExperienceToCreateDto(formData);

  const response = await fetch(
    `${API_URL}/api/experiencias/registrar`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

const data =
  (await response.json()) as CreateExperienceResponseDto;

return {
  message: data.message,
  data: adaptExperience(data.data),
};
};
export const updateExperience = async (
  id: number,
  formData: ExperienceFormData,
): Promise<{
  message: string;
  data: Experience;
}> => {
  const payload = {
    id,
    ...adaptExperienceToCreateDto(formData),
  };

  const response = await fetch(`${API_URL}/api/experiencias/actualizar/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo actualizar la experiencia.');
  }

 const data =
  (await response.json()) as CreateExperienceResponseDto;

return {
  message: data.message,
  data: adaptExperience(data.data),
};
};

export const deleteExperience = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/experiencias/eliminar/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo eliminar la experiencia.');
  }
};