import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ProjectForm } from "../components/ProjectForm";
import {
  deleteProject,
  getProjects,
  getTechnologies,
  toggleFeaturedProject,
} from "../services/project.service";
import type { ProjectResponseDTO } from "../services/project.dto";
import type { Technology } from "../models/project.model";
import "../styles/projects.css";

export function ProjectsPage() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectResponseDTO | null>(
    null
  );

  const [proyectos, setProyectos] = useState<ProjectResponseDTO[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loadingProyectos, setLoadingProyectos] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState("");
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
    null
  );

  const [featuredMessage, setFeaturedMessage] = useState("");
  const [updatingFeaturedId, setUpdatingFeaturedId] = useState<number | null>(
    null
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [projectPendingDelete, setProjectPendingDelete] =
    useState<ProjectResponseDTO | null>(null);

  const technologyNameById = useMemo(() => {
    return technologies.reduce<Record<number, string>>((acc, technology) => {
      acc[technology.id] = technology.nombre;
      return acc;
    }, {});
  }, [technologies]);

  const sortedProjects = useMemo(() => {
    return [...proyectos].sort((a, b) => {
      if (a.destacar === b.destacar) return 0;
      return a.destacar ? -1 : 1;
    });
  }, [proyectos]);

  const cargarProyectos = async () => {
    try {
      setLoadingProyectos(true);

      const [proyectosData, technologiesData] = await Promise.all([
        getProjects(),
        getTechnologies(),
      ]);

      setProyectos(proyectosData);
      setTechnologies(technologiesData);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    } finally {
      setLoadingProyectos(false);
    }
  };

  useEffect(() => {
    void cargarProyectos();
  }, []);

  useEffect(() => {
    if (!deleteMessage) return;

    const timer = setTimeout(() => {
      setDeleteMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [deleteMessage]);

  useEffect(() => {
    if (!featuredMessage) return;

    const timer = setTimeout(() => {
      setFeaturedMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [featuredMessage]);

  const handleOpenDeleteModal = (proyecto: ProjectResponseDTO) => {
    setProjectPendingDelete(proyecto);
  };

  const handleConfirmDeleteProject = async () => {
    if (!projectPendingDelete) return;

    try {
      setDeletingProjectId(projectPendingDelete.idProyecto);
      setDeleteMessage("");
      setFeaturedMessage("");

      await deleteProject(projectPendingDelete.idProyecto);

      setProyectos((prev) =>
        prev.filter(
          (item) => item.idProyecto !== projectPendingDelete.idProyecto
        )
      );

      setDeleteMessage("Proyecto eliminado.");
      setProjectPendingDelete(null);
    } catch (error) {
      setDeleteMessage(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el proyecto."
      );
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleToggleFeatured = async (proyecto: ProjectResponseDTO) => {
    try {
      setUpdatingFeaturedId(proyecto.idProyecto);
      setFeaturedMessage("");
      setDeleteMessage("");

      const nextValue = !proyecto.destacar;

      await toggleFeaturedProject(proyecto, nextValue);

      setProyectos((prev) =>
        prev.map((item) =>
          item.idProyecto === proyecto.idProyecto
            ? { ...item, destacar: nextValue }
            : item
        )
      );

      setFeaturedMessage(
        nextValue
          ? "Proyecto marcado como destacado."
          : "Proyecto quitado de destacados."
      );
    } catch (error) {
      setFeaturedMessage(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el destacado."
      );
    } finally {
      setUpdatingFeaturedId(null);
    }
  };

  if (showForm) {
    return (
      <main className="projects-form-only">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setProjectToEdit(null);
              void cargarProyectos();
            }}
            className="mb-5 bg-card-bg/60 border border-card-border text-text-primary px-5 py-3 rounded-xl hover:border-[#10B981]/50 transition"
          >
            ← Volver a mis proyectos
          </button>

          <ProjectForm
            projectToEdit={projectToEdit}
            onCancel={() => {
              setShowForm(false);
              setProjectToEdit(null);
            }}
            onSaved={() => {
              setShowForm(false);
              setProjectToEdit(null);
              void cargarProyectos();
            }}
          />
        </div>
      </main>
    );
  }

  return (
      <main className="relative min-h-[calc(100vh-100px)] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 max-w-5xl mx-auto overflow-x-hidden">      <button
        type="button"
        onClick={() => navigate("/profile")}
className="
mb-5
w-full
sm:w-auto
bg-card-bg/60
border
border-card-border
text-text-primary
px-4
sm:px-5
py-3
rounded-xl
hover:border-[#10B981]/50
transition
text-sm
sm:text-base
"      >
        ← Ir a perfil
      </button>

      <section className="bg-card-bg/60 backdrop-blur-md border border-card-border rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">     
                   Mis Proyectos
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Proyectos registrados en tu portafolio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setProjectToEdit(null);
              setShowForm(true);
            }}
className="
w-full
sm:w-auto
bg-[#10B981]
hover:opacity-90
text-white
px-5
py-3
rounded-xl
shadow-lg
text-center
font-semibold
text-sm
sm:text-base
"          >
            Agregar proyecto
          </button>
        </div>

        {deleteMessage && (
          <p className="project-message" style={{ marginBottom: "18px" }}>
            {deleteMessage}
          </p>
        )}

        {featuredMessage && (
          <p className="project-message" style={{ marginBottom: "18px" }}>
            {featuredMessage}
          </p>
        )}

        {loadingProyectos ? (
          <p className="text-text-secondary">Cargando proyectos...</p>
        ) : proyectos.length === 0 ? (
          <div 
          className="bg-card-bg/50 border border-card-border rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-text-primary">
              Aún no tienes proyectos registrados
            </h3>
            <p className="text-text-secondary text-sm mt-2">
              Cuando registres un proyecto, aparecerá aquí como una tarjeta.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sortedProjects.map((proyecto) => (
<article
  key={proyecto.idProyecto}
  className={`bg-card-bg/50 backdrop-blur-sm border rounded-2xl p-4 sm:p-5 md:p-6 overflow-hidden transition-all ${
    proyecto.destacar
      ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.25)]"
      : "border-card-border hover:border-[#10B981]/50"
  }`}
>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary break-words">       
                 {proyecto.titulo}
                      </h3>

                      {proyecto.destacar && (
                        <span className="inline-flex w-fit mt-2 bg-yellow-400/10 border border-yellow-400 text-yellow-200 px-3 py-1 rounded-full text-xs font-extrabold">
                          ★ Destacado
                        </span>
                      )}

                      {proyecto.rolProyecto && (
                        <p className="text-brand-morado font-semibold mt-2">
                          {proyecto.rolProyecto}
                        </p>
                      )}
                    </div>

                    <div className="flex sm:justify-end">
                      <span className="w-fit px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/10 text-[#10B981]">
                        {proyecto.estadoProyecto || "Registrado"}
                      </span>
                    </div>
                  </div>
</div>

{proyecto.descripcion && (
  <div
className="
text-sm
sm:text-base
text-text-secondary
mt-3
max-w-full
break-words
overflow-hidden
[&_ul]:list-disc [&_ul]:pl-6
[&_ol]:list-decimal [&_ol]:pl-6
[&_li]:mb-1
"
    dangerouslySetInnerHTML={{
      __html: proyecto.descripcion,
    }}
  />
)}

<div className="flex flex-wrap gap-2 mt-4 overflow-hidden">                    {proyecto.tecnologiaIds?.map((id, index) => (
                      <span
                        key={id}
className="
px-2
sm:px-3
py-1
rounded-lg
bg-brand-azul-brillante/10
text-brand-azul-brillante
text-[11px]
sm:text-xs
font-semibold
break-all
"                      >
                        {proyecto.nombresTecnologias?.[index] ||
                          technologyNameById[id] ||
                          `Tecnología ${id}`}
                      </span>
                    ))}
                  </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-sm">
                      <div className="bg-card-bg/50 border border-card-border rounded-xl p-3">
                      <p className="text-text-secondary">Visibilidad</p>
                      <p className="font-semibold text-text-primary">
                        {proyecto.esPublico ? "Público" : "Privado"}
                      </p>
                    </div>

                    <div className="bg-card-bg/50 border border-card-border rounded-xl p-3">
                      <p className="text-text-secondary">Inicio</p>
                      <p className="font-semibold text-text-primary">
                        {proyecto.fechaInicio || "Sin fecha"}
                      </p>
                    </div>

                    <div className="bg-card-bg/50 border border-card-border rounded-xl p-3">
                      <p className="text-text-secondary">Finalización</p>
                      <p className="font-semibold text-text-primary">
                        {proyecto.fechaFinalizacion || "Sin fecha"}
                      </p>
                    </div>
                  </div>

<div className="flex flex-wrap gap-2 sm:gap-3 mt-4 break-all">
                      {proyecto.enlaceGithub && (
                      <a
                        href={proyecto.enlaceGithub}
                        target="_blank"
                        rel="noopener noreferrer"
className="
text-brand-azul-brillante
hover:underline
font-semibold
text-xs
sm:text-sm
break-all
"                      >
                        Repositorio
                      </a>
                    )}

                    {proyecto.enlaceDemo && (
                      <a
                        href={proyecto.enlaceDemo}
                        target="_blank"
                        rel="noopener noreferrer"
className="
text-brand-azul-brillante
hover:underline
font-semibold
text-xs
sm:text-sm
break-all
"                      >
                        Demo
                      </a>
                    )}

                    {proyecto.urlsAdicionales?.map((url, index) => (
                      <a
                        key={`${url}-${index}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-azul-brillante hover:underline font-semibold text-sm"
                      >
                        Enlace adicional {index + 1}
                      </a>
                    ))}
                  </div>

{proyecto.urlsImagenes && proyecto.urlsImagenes.length > 0 && (
  <div className="mt-6">
    <p className="text-text-secondary text-sm font-semibold mb-3">
      Imágenes del proyecto
    </p>

<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {proyecto.urlsImagenes.map((imagenUrl, index) => (
        <button
          key={`${imagenUrl}-${index}`}
          type="button"
          onClick={() => setSelectedImage(imagenUrl)}
  className="
    w-full
    h-12
    sm:h-16
    rounded-lg
    bg-[#0F223D]
    border
    border-card-border
    text-xs
    flex
    items-center
    justify-center
  "     >
          Imagen {index + 1}
        </button>
      ))}
    </div>
  </div>
)}

{proyecto.urlPdfs && proyecto.urlPdfs.length > 0 && (
  <div className="mt-6">
    <p className="text-text-secondary text-sm font-semibold mb-3">
      PDFs del proyecto
    </p>
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {proyecto.urlPdfs.map((pdfUrl, index) => {
        const pdfName = `PDF ${index + 1}`;
        return (
          <div
            key={`${pdfUrl}-${index}`}
className="
bg-[#0F223D]
border
border-card-border
rounded-2xl
p-4
sm:p-5
flex
flex-col
items-center
text-center
overflow-hidden
"          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-400/30 flex items-center justify-center mb-3">
              <span className="text-4xl">📄</span>
            </div>

            <p className="text-text-primary font-semibold text-sm  w-full">
              {pdfName}
            </p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-brand-azul-brillante hover:underline font-semibold text-sm"
            >
              Ver PDF completo
            </a>
          </div>
        );
      })}
    </div>
  </div>
)}

<div className="flex flex-col md:flex-row justify-end gap-3 mt-6 pt-4 border-t border-card-border">
                    <button
                    type="button"
                    onClick={() => handleToggleFeatured(proyecto)}
                    disabled={updatingFeaturedId === proyecto.idProyecto}
                    className="w-full md:w-auto bg-[#f3cf32] hover:bg-[#e8e82c] text-white px-5 py-2.5 rounded-xl font-bold"
                  >
                    {updatingFeaturedId === proyecto.idProyecto
                      ? "Actualizando..."
                      : proyecto.destacar
                        ? "Quitar destacado"
                        : "Destacar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProjectToEdit(proyecto);
                      setShowForm(true);
                    }}
                    className="w-full md:w-auto bg-[#0D8CFF] hover:bg-[#0077E6] text-white px-5 py-2.5 rounded-xl font-bold"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenDeleteModal(proyecto)}
                    disabled={deletingProjectId === proyecto.idProyecto}
                    className="w-full md:w-auto bg-[#ff0d0d] hover:bg-[#ff7676] text-white px-5 py-2.5 rounded-xl font-bold"
                  >
                    {deletingProjectId === proyecto.idProyecto
                      ? "Eliminando..."
                      : "Eliminar"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
        className="relative max-w-5xl w-full px-2 sm:px-4"
              onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
className="
absolute
top-2
right-2
sm:-top-12
sm:right-0
text-white
bg-red-500
hover:bg-red-600
px-3
sm:px-4
py-2
rounded-xl
font-bold
text-sm
"            >
              Cerrar
            </button>

            <img
              src={selectedImage}
              alt="Imagen ampliada del proyecto"
className="
w-full
max-h-[75vh]
sm:max-h-[85vh]
object-contain
rounded-2xl
bg-black
"            />
          </div>
        </div>
      )}

      {projectPendingDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-3 sm:mx-0 bg-[#102B4C] border border-red-500/40 rounded-2xl shadow-2xl p-6">
<h3 className="text-lg sm:text-xl font-bold text-white">
                Eliminar proyecto
            </h3>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              ¿Estás seguro de eliminar definitivamente el proyecto{" "}
              <span className="font-bold text-white">
                "{projectPendingDelete.titulo}"
              </span>
              ?
            </p>

            <p className="text-red-300 text-sm mt-3">
              Esta acción no se puede deshacer.
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setProjectPendingDelete(null)}
                disabled={deletingProjectId === projectPendingDelete.idProyecto}
                className="px-5 py-2.5 rounded-xl font-bold border border-slate-500 text-slate-200 hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteProject}
                disabled={deletingProjectId === projectPendingDelete.idProyecto}
                className="px-5 py-2.5 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deletingProjectId === projectPendingDelete.idProyecto
                  ? "Eliminando..."
                  : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}