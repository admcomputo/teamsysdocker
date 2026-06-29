import type { ProjectFormModel } from "../models/project.model";

const MIN_DATE = "1970-01-01";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function isValidUrl(value: string): boolean {
  if (!value.trim()) return true;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
export interface ProjectFormErrors {
  nombreProyecto?: string;
  rolProyecto?: string;
  descripcionProyecto?: string;
  tecnologias?: string;
  urlRepositorio?: string;
  repositoryUrl?: string;
  urlDemo?: string;
  urlsAdicionales?: string;
  fechaInicio?:string;
  fechaFinalizacion?:string;
}
export function validateProjectForm(
  form: ProjectFormModel
): ProjectFormErrors {
  const errors: ProjectFormErrors = {};
  const today = getToday();

  if (!form.nombreProyecto.trim()) {
    errors.nombreProyecto = "El nombre del proyecto es obligatorio.";
  }

  if (!form.rolProyecto.trim()) {
    errors.rolProyecto = "El rol en el proyecto es obligatorio.";
  }

  if (!form.descripcionProyecto.trim()) {
    errors.descripcionProyecto =
      "La descripción del proyecto es obligatoria.";
  } else if (form.descripcionProyecto.trim().length < 20) {
    errors.descripcionProyecto =
      "La descripción debe tener al menos 20 caracteres.";
  }

  if (
    form.tecnologiasIds.length === 0 &&
    form.nuevasTecnologias.length === 0
  ) {
    errors.tecnologias =
      "Debe agregar al menos una tecnología.";
  }

  if (!isValidUrl(form.urlRepositorio)) {
    errors.urlRepositorio =
      "La URL del repositorio no es válida.";
  }

  if (!isValidUrl(form.urlDemo)) {
    errors.urlDemo =
      "La URL de demo no es válida.";
  }

  if (
    form.urlsAdicionales.some((url) => !isValidUrl(url))
  ) {
    errors.urlsAdicionales =
      "URLs adicional no es válida.";
  }

  if (form.fechaInicio) {
    if (form.fechaInicio < MIN_DATE) {
      errors.fechaInicio =
        "La fecha de inicio no puede ser menor a 1970.";
    } else if (form.fechaInicio > today) {
      errors.fechaInicio =
        "La fecha de inicio no puede ser mayor a hoy.";
    }
  }

  if (
    form.estadoProyecto !== "FINALIZADO" &&
    form.fechaFinalizacion
  ) {
    errors.fechaFinalizacion =
      "Solo se puede registrar fecha de finalización si el proyecto está finalizado.";
  }

  if (
    form.estadoProyecto === "FINALIZADO" &&
    form.fechaFinalizacion
  ) {
    if (form.fechaFinalizacion < MIN_DATE) {
      errors.fechaFinalizacion =
        "La fecha de finalización no puede ser menor a 1970.";
    } else if (form.fechaFinalizacion > today) {
      errors.fechaFinalizacion =
        "La fecha de finalización no puede ser mayor a hoy.";
    } else if (
      form.fechaInicio &&
      form.fechaFinalizacion < form.fechaInicio
    ) {
      errors.fechaFinalizacion =
        "La fecha de finalización no puede ser menor que la fecha de inicio.";
    }
  }

  return errors;
}
