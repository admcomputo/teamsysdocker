import { useState, useEffect, useRef } from 'react';
import type { AcademicTraining } from '../models/academicTraining.model';
import { academicTrainingService } from '../services/academicTraining.service';
import { useToast } from '@shared/hooks/useToast';

const LEVEL_ORDER = [
  'PRIMARIA', 'SECUNDARIA', 'TECNICO', 'LICENCIATURA',
  'MAESTRIA', 'DOCTORADO', 'DIPLOMADO', 'CURSOS',
];

export const useAcademicTrainingList = () => {
  const [trainings, setTrainings] = useState<AcademicTraining[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  // Use a ref so the effect doesn't re-run when showToast identity changes
  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  const fetchTrainings = async () => {
    try {
      setIsLoading(true);
      const data = await academicTrainingService.getAcademicTrainings();
      setTrainings(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar la formación académica';
      showToastRef.current(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await academicTrainingService.deleteAcademicTraining(id);
      setTrainings(prev => prev.filter(t => t.id !== id));
      showToastRef.current('Formación eliminada con éxito', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar la formación';
      showToastRef.current(message, 'error');
    }
  };

  const handleTogglePrivacy = async (training: AcademicTraining) => {
    if (!training.id) return;
    try {
      const updatedTraining = { ...training, isPublic: !training.isPublic };
      await academicTrainingService.updateAcademicTraining(training.id, updatedTraining);
      setTrainings(prev => prev.map(t => t.id === training.id ? { ...t, isPublic: !t.isPublic } : t));
      showToastRef.current('Privacidad actualizada con éxito', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar la privacidad';
      showToastRef.current(message, 'error');
    }
  };

  const filteredTrainings = [...trainings]
    .filter(t =>
      (t.institution ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.degree ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.fieldOfStudy ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const ai = LEVEL_ORDER.indexOf((a.level ?? '').toUpperCase());
      const bi = LEVEL_ORDER.indexOf((b.level ?? '').toUpperCase());
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });

  return {
    trainings: filteredTrainings,
    searchTerm,
    setSearchTerm,
    isLoading,
    handleDelete,
    handleTogglePrivacy,
    refetch: fetchTrainings,
  };
};
