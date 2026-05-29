import { CVType, type BackendCV, type CVModel } from '../models/cv.model';

export const backendCVToModel = (cv: BackendCV): CVModel => {
  return {
    id: String(cv.idCurriculum),
    idCurriculum: cv.idCurriculum,
    name: cv.titulo,
    type: cv.tipo === 'GENERADO' ? CVType.GENERATED : CVType.UPLOADED,
    fileUrl: cv.urlPdf,
    fileName: `${cv.titulo}.pdf`,
    isOfficial: cv.esOficial,
    createdAt: new Date(cv.fechaCreacion),
    updatedAt: new Date(cv.fechaCreacion),
  };
};