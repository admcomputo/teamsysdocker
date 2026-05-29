import { useEffect, useState } from 'react';
import type { CVModel, SaveCVRequest } from '../models/cv.model';
import { CVLoadingState, CVTemplate } from '../models/cv.model';
import { cvManagementService } from '../services/cv.service';
import { backendCVToModel } from '../services/cv.adapter';

const mockTemplates = [
  {
    id: CVTemplate.MODERN,
    name: 'Moderno',
    description: 'Diseño contemporáneo con colores vibrantes',
    thumbnail: 'https://wallpapers.com/images/thumbnail/pastel-gradient-background-6000-x-4000-wxtayamtg1f4y4c0.webp',
  },
  {
    id: CVTemplate.CLASSIC,
    name: 'Clásico',
    description: 'Formato tradicional y profesional',
    thumbnail: 'https://printex.co.za/wp-content/uploads/2025/02/Charcoal-Colour.png',
  },
  {
    id: CVTemplate.MINIMAL,
    name: 'Minimalista',
    description: 'Limpio y minimalista, enfoque en contenido',
    thumbnail: 'https://www.ferreterias.pe/cdn/shop/products/Celeste_300x.png?v=1632166898',
  },
  {
    id: CVTemplate.PROFESSIONAL,
    name: 'Profesional',
    description: 'Diseño ejecutivo para empresas',
    thumbnail: 'https://wallpapers.com/images/thumbnail/black-abstract-light-wavelengths-1pg5zwbdqazj9uej.webp',
  },
];

export const useCVManagement = () => {
  const [cvs, setCvs] = useState<CVModel[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<CVLoadingState>(CVLoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const loadCVs = async () => {
    setLoadingState(CVLoadingState.LOADING);
    setError(null);

    try {
      const response = await cvManagementService.getCVs();
      setCvs(response.map(backendCVToModel));
      setLoadingState(CVLoadingState.SUCCESS);
    } catch {
      setError('No se pudieron cargar los CVs.');
      setLoadingState(CVLoadingState.ERROR);
    }
  };

  useEffect(() => {
    loadCVs();
  }, []);

  const getTemplates = () => mockTemplates;

  const getCVs = () => cvs;

  const getOfficialCV = () => {
    return cvs.find((cv) => cv.isOfficial) || null;
  };

  const registerCV = async (payload: SaveCVRequest) => {
    setLoadingState(CVLoadingState.LOADING);
    setError(null);

    try {
      const created = await cvManagementService.registerCV(payload);
      await loadCVs();
      setLoadingState(CVLoadingState.SUCCESS);
      return backendCVToModel(created);
    } catch {
      setError('No se pudo registrar el CV.');
      setLoadingState(CVLoadingState.ERROR);
      throw new Error('No se pudo registrar el CV.');
    }
  };

  const generateCV = async (templateId: string, urlPdf: string) => {
    const template = mockTemplates.find((item) => item.id === templateId);

    return registerCV({
      titulo: `CV generado - ${template?.name ?? 'Plantilla'} - ${new Date().toLocaleDateString()}`,
      tipo: 'GENERADO',
      esOficial: false,
      urlPdf,
    });
  };

  const uploadCV = async (
    title: string,
    urlPdf: string,
    makeOfficial: boolean
  ) => {
    return registerCV({
      titulo: title,
      tipo: 'SUBIDO',
      esOficial: makeOfficial,
      urlPdf,
    });
  };

  const uploadPdf = async (file: File, title: string, makeOfficial: boolean) => {
    setLoadingState(CVLoadingState.LOADING);
    setError(null);

    try {
      const urlPdf = await cvManagementService.uploadPdfToCloudinary(file);
      const created = await uploadCV(title, urlPdf, makeOfficial);
      setLoadingState(CVLoadingState.SUCCESS);
      return created;
    } catch {
      setError('No se pudo subir el PDF a Cloudinary.');
      setLoadingState(CVLoadingState.ERROR);
      throw new Error('No se pudo subir el PDF a Cloudinary.');
    }
  };

  const setOfficialCV = async (cvId: string) => {
    const selected = cvs.find((cv) => cv.id === cvId);
    if (!selected) return;

    await cvManagementService.updateCV(selected.idCurriculum, {
      titulo: selected.name,
      tipo: selected.type,
      esOficial: true,
      urlPdf: selected.fileUrl,
    });

    await loadCVs();
  };

  const removeOfficialCV = async (cvId: string) => {
    const selected = cvs.find((cv) => cv.id === cvId);
    if (!selected) return;

    await cvManagementService.updateCV(selected.idCurriculum, {
      titulo: selected.name,
      tipo: selected.type,
      esOficial: false,
      urlPdf: selected.fileUrl,
    });

    await loadCVs();
  };

  const renameCVs = async (cvId: string, newName: string) => {
    const selected = cvs.find((cv) => cv.id === cvId);
    if (!selected) return;

    await cvManagementService.updateCV(selected.idCurriculum, {
      titulo: newName,
      tipo: selected.type,
      esOficial: selected.isOfficial,
      urlPdf: selected.fileUrl,
    });

    await loadCVs();
  };

  const deleteCV = async (cvId: string) => {
    const selected = cvs.find((cv) => cv.id === cvId);
    if (!selected) return;

    await cvManagementService.deleteCV(selected.idCurriculum);
    await loadCVs();
  };

  const downloadCV = (cvId: string) => {
    const selected = cvs.find((cv) => cv.id === cvId);
    if (!selected) return;

    window.open(selected.fileUrl, '_blank');
  };

  return {
    cvs,
    getTemplates,
    getCVs,
    getOfficialCV,
    selectedTemplate,
    setSelectedTemplate,
    generateCV,
    uploadCV,
    uploadPdf,
    setOfficialCV,
    removeOfficialCV,
    renameCVs,
    deleteCV,
    downloadCV,
    loadingState,
    error,
    loadCVs,
  };
};