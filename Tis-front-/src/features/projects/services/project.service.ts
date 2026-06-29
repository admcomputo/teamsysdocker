import type { Technology } from "../models/project.model";
import type {
  CreateProjectDTO,
  ProjectResponseDTO,
  TechnologiesResponseDTO,
  UpdateProjectDTO,
} from "./project.dto";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

function getToken() {
  return (
    sessionStorage.getItem("jwt") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("token")
  );
}

function getAuthHeaders() {
  const token = getToken();

  if (!token) {
    throw new Error("No hay token de sesión. Inicia sesión nuevamente.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

const CLOUD_NAME = "dvhan21ur";
const UPLOAD_PRESET = "portafolio";

async function uploadToCloudinary(
  file: File,
  resourceType: "image" | "raw",
  folder: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.secure_url) {
    throw new Error(
      data?.error?.message ||
        `Error al subir el archivo a Cloudinary (${resourceType})`
    );
  }

  return data.secure_url as string;
}

function mapProjectToUpdateDTO(
  project: ProjectResponseDTO,
  destacar: boolean
): UpdateProjectDTO {
  return {
    titulo: project.titulo,
    descripcion: project.descripcion,
    tecnologiaIds: project.tecnologiaIds ?? [],
    nuevasTecnologias: [],

    enlaceGithub: project.enlaceGithub || undefined,
    enlaceDemo: project.enlaceDemo || undefined,

    urlsImagenes: project.urlsImagenes ?? [],
    urlPdfs: project.urlPdfs ?? [],

    esPublico: project.esPublico,
    destacar,

    rolProyecto: project.rolProyecto || undefined,
    urlsAdicionales: project.urlsAdicionales ?? [],
    fechaInicio: project.fechaInicio || undefined,
    fechaFinalizacion: project.fechaFinalizacion || undefined,
    estadoProyecto: project.estadoProyecto || "FINALIZADO",
  };
}

export const projectService = {
  getTechnologies: async (): Promise<Technology[]> => {
    const response = await fetch(`${API_URL}/api/tecnologias`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = (await response.json().catch(() => null)) as
      | TechnologiesResponseDTO
      | Technology[]
      | null;

    if (!response.ok) {
      throw new Error("No se pudieron obtener las tecnologías.");
    }

    const data = Array.isArray(result) ? result : result?.data || [];

    return data.map((tech) => ({
      id: tech.id,
      nombre: tech.nombre,
      categoria: tech.categoria,
      logoUrl: tech.logoUrl,
    }));
  },

  uploadImageToCloudinary: async (file: File): Promise<string> => {
    return uploadToCloudinary(file, "image", "project_images");
  },

  uploadPdfToCloudinary: async (file: File): Promise<string> => {
    return uploadToCloudinary(file, "raw", "project_pdfs");
  },

  createProject: async (data: CreateProjectDTO) => {
    const response = await fetch(`${API_URL}/api/proyectos/registrar`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al registrar el proyecto");
    }

    return result;
  },

  updateProject: async (idProyecto: number, data: UpdateProjectDTO) => {
    const response = await fetch(`${API_URL}/api/proyectos/${idProyecto}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al actualizar el proyecto");
    }

    return result;
  },

  deleteProject: async (idProyecto: number) => {
    const response = await fetch(`${API_URL}/api/proyectos/${idProyecto}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al eliminar el proyecto");
    }

    return result;
  },

  toggleFeaturedProject: async (
    project: ProjectResponseDTO,
    destacar: boolean
  ) => {
    const payload = mapProjectToUpdateDTO(project, destacar);

    return projectService.updateProject(project.idProyecto, payload);
  },

  getProjects: async (): Promise<ProjectResponseDTO[]> => {
    const response = await fetch(`${API_URL}/api/proyectos`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.message || "Error al obtener proyectos");
    }

    return result?.data || [];
  },
};

export const createProject = projectService.createProject;
export const updateProject = projectService.updateProject;
export const deleteProject = projectService.deleteProject;
export const toggleFeaturedProject = projectService.toggleFeaturedProject;
export const getProjects = projectService.getProjects;
export const getTechnologies = projectService.getTechnologies;
export const uploadProjectImage = projectService.uploadImageToCloudinary;
export const uploadProjectPdf = projectService.uploadPdfToCloudinary;