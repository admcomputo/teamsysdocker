import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useToast } from '@shared/hooks/useToast';
import { academicTrainingService } from '../services/academicTraining.service';
import type { AcademicTraining } from '../models/academicTraining.model';

export const useAcademicTraining = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const editingTraining = location.state?.training as AcademicTraining | undefined;

  const [institution, setInstitution] = useState(editingTraining?.institution || '');
  const [degree, setDegree] = useState(editingTraining?.degree || '');
  const [level, setLevel] = useState(editingTraining?.level || '');
  const [fieldOfStudy, setFieldOfStudy] = useState(editingTraining?.fieldOfStudy || '');

  // Format date correctly for input type="date"
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
  };

  const [startDate, setStartDate] = useState(formatDate(editingTraining?.startDate) || '');
  const [endDate, setEndDate] = useState(formatDate(editingTraining?.endDate) || '');
  const [status, setStatus] = useState(editingTraining?.status || '');
  const [description, setDescription] = useState(editingTraining?.description || '');
  const [certificateTest, setCertificateTest] = useState<File | null>(null);
  const [certificateUrl, setCertificateUrl] = useState(editingTraining?.certificateUrl || '');

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAddTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!level) {
      showToast('Por favor, selecciona un nivel.', 'error');
      setIsLoading(false);
      return;
    }

    if (!status) {
      showToast('Por favor, selecciona un estado.', 'error');
      setIsLoading(false);
      return;
    }

    if (!startDate) {
      showToast('Por favor, ingresa la fecha de inicio.', 'error');
      setIsLoading(false);
      return;
    }

    if (endDate && startDate > endDate) {
      showToast('La fecha de inicio no puede ser mayor que la fecha de finalización.', 'error');
      setIsLoading(false);
      return;
    }

    try {
      let uploadedUrl = certificateUrl;
      if (certificateTest) {
        uploadedUrl = await academicTrainingService.uploadToCloudinary(certificateTest);
        setCertificateUrl(uploadedUrl); // Update state with new URL
      }

      const trainingData = {
        institution,
        degree,
        level,
        fieldOfStudy,
        startDate,
        endDate,
        status,
        description,
        certificateTest,
        certificateUrl: uploadedUrl,
      };

      if (id) {
        await academicTrainingService.updateAcademicTraining(id, trainingData);
        showToast(`Formación "${degree}" actualizada con éxito.`, 'success');
      } else {
        await academicTrainingService.addAcademicTraining(trainingData);
        showToast(`Formación "${degree}" añadida con éxito.`, 'success');
      }
      handleCancel();
    } catch (error) {
      const message = error instanceof Error ? error.message : `Error al ${id ? 'actualizar' : 'añadir'} la formación académica`;
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setInstitution('');
    setDegree('');
    setLevel('');
    setFieldOfStudy('');
    setStartDate('');
    setEndDate('');
    setStatus('');
    setDescription('');
    setCertificateTest(null);
    setCertificateUrl('');
    navigate(-1);
  };

  return {
    institution, setInstitution,
    degree, setDegree,
    level, setLevel,
    fieldOfStudy, setFieldOfStudy,
    startDate, setStartDate,
    endDate, setEndDate,
    status, setStatus,
    description, setDescription,
    certificateTest, setCertificateTest,
    certificateUrl, setCertificateUrl,
    isLoading,
    isEditing: !!id,
    handleAddTraining,
    handleCancel,
  };
};
