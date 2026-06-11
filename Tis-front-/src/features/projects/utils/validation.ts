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

export function validateProjectForm(form: ProjectFormModel): string | null {
  const today = getToday();

  if (!form.nombreProyecto.trim()) {
    return "El nombre del proyecto es obligatorio.";
  }

  if (!form.rolProyecto.trim()) {
    return "El rol en el proyecto es obligatorio.";
  }

  if (!form.descripcionProyecto.trim()) {
    return "La descripción del proyecto es obligatoria.";
  }

  if (form.descripcionProyecto.trim().length < 20) {
    return "La descripción debe tener al menos 20 caracteres.";
  }

  if (form.tecnologiasIds.length === 0 && form.nuevasTecnologias.length === 0) {
    return "Debe agregar al menos una tecnología existente o una nueva tecnología.";
  }

  if (!isValidUrl(form.urlRepositorio)) {
    return "La URL del repositorio no es válida.";
  }

  if (!isValidUrl(form.urlDemo)) {
    return "La URL de demo no es válida.";
  }

  const invalidAdditionalUrl = form.urlsAdicionales.some(
    (url) => !isValidUrl(url)
  );

  if (invalidAdditionalUrl) {
    return "Una de las URLs adicionales no es válida.";
  }

  if (form.fechaInicio) {
    if (form.fechaInicio < MIN_DATE) {
      return "La fecha de inicio no puede ser menor a 1970.";
    }

    if (form.fechaInicio > today) {
      return "La fecha de inicio no puede ser mayor a la fecha de hoy.";
    }
  }

  if (form.estadoProyecto !== "FINALIZADO" && form.fechaFinalizacion) {
    return "Solo se puede registrar fecha de finalización si el proyecto está finalizado.";
  }

  if (form.estadoProyecto === "FINALIZADO" && form.fechaFinalizacion) {
    if (form.fechaFinalizacion < MIN_DATE) {
      return "La fecha de finalización no puede ser menor a 1970.";
    }

    if (form.fechaFinalizacion > today) {
      return "La fecha de finalización no puede ser mayor a la fecha de hoy.";
    }

    if (form.fechaInicio && form.fechaFinalizacion < form.fechaInicio) {
      return "La fecha de finalización no puede ser menor que la fecha de inicio.";
    }
  }

  return null;
}
