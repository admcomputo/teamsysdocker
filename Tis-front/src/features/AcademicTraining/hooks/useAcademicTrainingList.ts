import { useState, useEffect } from 'react';
import type { AcademicTraining } from '../models/academicTraining.model';
import { academicTrainingService } from '../services/academicTraining.service';
import { useToast } from '@shared/hooks/useToast';

export const useAcademicTrainingList = () => {
  const [trainings, setTrainings] = useState<AcademicTraining[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setIsLoading(true);
        const data = await academicTrainingService.getAcademicTrainings();
        setTrainings(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al cargar la formación académica';
        showToast(message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainings();
  }, [showToast]);

  const handleDelete = async (id: string) => {
    try {
      await academicTrainingService.deleteAcademicTraining(id);
      setTrainings(prev => prev.filter(t => t.id !== id));
      showToast('Formación eliminada con éxito', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar la formación';
      showToast(message, 'error');
    }
  };

  const filteredTrainings = trainings.filter(training =>
    training.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
    training.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    trainings: filteredTrainings,
    searchTerm,
    setSearchTerm,
    isLoading,
    handleDelete
  };
};
