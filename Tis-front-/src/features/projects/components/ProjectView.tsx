import type { ProjectFormModel } from "../models/project.model";

interface Props {
  project: ProjectFormModel;
}

export function ProjectView({ project }: Props) {
  const allTechnologies = [
    ...project.tecnologiasHerramientas,
    ...project.nuevasTecnologias,
  ];

  return (
    <article className="project-preview-box">
      <div className="project-preview-header">
        <div>
          <h3>{project.nombreProyecto || "Nombre del proyecto"}</h3>
          <p>{project.rolProyecto || "Rol en el proyecto"}</p>
        </div>

        <span className="project-preview-status">
          {project.estadoProyecto === "EN_DESARROLLO"
            ? "En desarrollo"
            : project.estadoProyecto === "PAUSADO"
              ? "Pausado"
              : "Finalizado"}
        </span>
      </div>

      <p className="project-preview-description">
        {project.descripcionProyecto || "Descripción del proyecto..."}
      </p>

      <div className="project-preview-info">
        <div>
          <strong>Privacidad</strong>
          <span>{project.privacidad === "PUBLICO" ? "Público" : "Privado"}</span>
        </div>

        <div>
          <strong>Fecha inicio</strong>
          <span>{project.fechaInicio || "Sin fecha"}</span>
        </div>

        <div>
          <strong>Fecha fin</strong>
          <span>{project.fechaFinalizacion || "Sin fecha"}</span>
        </div>
      </div>

      <div className="project-preview-techs">
        {allTechnologies.length > 0 ? (
          allTechnologies.map((tech, index) => (
            <span key={`${tech}-${index}`}>{tech}</span>
          ))
        ) : (
          <span>Sin tecnologías</span>
        )}
      </div>

      {project.imagenes.length > 0 && (
        <div className="project-preview-images">
          {project.imagenes.map((image, index) => (
            <img
              key={`${image.url}-${index}`}
              src={image.url}
              alt={image.descripcion || "Imagen del proyecto"}
            />
          ))}
        </div>
      )}

      {project.pdfs.length > 0 && (
        <div className="project-preview-links">
          {project.pdfs.map((pdf, index) => (
            <a key={`${pdf.url}-${index}`} href={pdf.url} target="_blank" rel="noreferrer">
              Ver PDF {index + 1}
            </a>
          ))}
        </div>
      )}

      <div className="project-preview-links">
        {project.urlRepositorio && (
          <a href={project.urlRepositorio} target="_blank" rel="noreferrer">
            Repositorio
          </a>
        )}

        {project.urlDemo && (
          <a href={project.urlDemo} target="_blank" rel="noreferrer">
            Demo
          </a>
        )}

        {project.urlsAdicionales
          .filter((url) => url.trim() !== "")
          .map((url, index) => (
            <a key={`${url}-${index}`} href={url} target="_blank" rel="noreferrer">
              Enlace adicional {index + 1}
            </a>
          ))}
      </div>
    </article>
  );
}
