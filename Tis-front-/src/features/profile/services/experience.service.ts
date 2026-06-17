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

const API_URL = ' https://teamsysback.apps.cs.umss.edu.bo';

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
): Promise<Experience> => {
  const payload = adaptExperienceToCreateDto(formData);

  console.log('PAYLOAD EXPERIENCE:', payload);

  const response = await fetch(`${API_URL}/api/experiencias/registrar`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ERROR BACKEND EXPERIENCE:', errorText);
    throw new Error(errorText || 'No se pudo registrar la experiencia.');
  }

  const data = (await response.json()) as CreateExperienceResponseDto;
  return adaptExperience(data.data);
};

export const updateExperience = async (
  id: number,
  formData: ExperienceFormData,
): Promise<Experience> => {
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

  const data = (await response.json()) as CreateExperienceResponseDto;
  return adaptExperience(data.data);
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